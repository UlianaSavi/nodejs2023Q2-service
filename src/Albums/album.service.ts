import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { IAlbum, IAlbumDto } from './album.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { Artist } from 'src/Artists/artist.entity';
import { CustomLoggerService } from 'src/Logger/logger.service';

@Injectable()
export class AlbumService {
  status: number | null = null;

  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private logger: CustomLoggerService,
  ) {
    this.logger.setContext('AlbumService');
  }

  async getAll() {
    const albums = await this.albumRepository.find();
    const result: IResponse = {
      data: albums.at(0) ? albums : [],
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  async getById(id: string) {
    let candidate: Album | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.albumRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (isValid && candidate) {
      this.status = StatusCodes.OK;
      message = null;
    }
    if (isValid && !candidate) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Album with id ${id} - not found!`;
    }

    if (message) {
      this.logger.error(message, 'AlbumService');
    }

    const result: IResponse = {
      data: message ? message : candidate,
      statusCode: this.status,
    };
    return result;
  }

  async createAlbum(dto: IAlbumDto) {
    let message: string | null = null;
    let newAlbum: IAlbum | null = null;
    let artist: Artist | null = null;

    if (!dto?.name?.length || !dto?.year) {
      message = 'Incorrect data for operation!';
      this.status = StatusCodes.BAD_REQUEST;
    } else {
      if (dto?.artistId) {
        artist = await this.artistRepository.findOneBy({
          id: dto.artistId,
        });
      }
      newAlbum = {
        id: uuidv4(),
        name: dto.name,
        year: dto.year,
        artist,
        artistId: dto.artistId,
      };

      const res = await this.albumRepository.insert(newAlbum);

      if (res.identifiers.at(0)) {
        this.status = StatusCodes.CREATED;
        message = null;
      } else {
        this.status = StatusCodes.FORBIDDEN;
        message = 'Operation failed!';
      }
    }

    if (message) {
      this.logger.error(message, 'AlbumService');
    }

    const result: IResponse = {
      data: message ? message : newAlbum,
      statusCode: this.status,
    };
    return result;
  }

  async updateAlbum(id: string, dto: IAlbumDto) {
    let message: string | null = null;
    let candidate: IAlbum | null = null;
    let albumToUpdate: Album | null = null;
    let artist: Artist | null = null;

    const isValid = validate(id);

    if (dto?.artistId && validate(dto?.artistId)) {
      artist = await this.artistRepository.findOneBy({ id: dto.artistId });
    }

    try {
      candidate = await this.albumRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (!candidate && isValid) {
      message = `Album with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (!dto?.name?.length || !dto?.year) {
      message = 'Invalid DTO!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && dto?.name?.length && dto?.year && candidate) {
      albumToUpdate = {
        id: candidate.id,
        name: dto.name,
        year: dto.year,
        artist: artist,
        artistId: dto.artistId,
      };
      try {
        await this.albumRepository.save(albumToUpdate);
        this.status = StatusCodes.OK;
      } catch (error) {
        message = 'Operation failed!';
      }
      this.status = StatusCodes.OK;
      message = null;
    }

    if (message) {
      this.logger.error(message, 'AlbumService');
    }

    const result: IResponse = {
      data: message ? message : albumToUpdate,
      statusCode: this.status,
    };
    return result;
  }

  async deleteAlbum(id: string) {
    let candidate: Album | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.albumRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `Album with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      await this.albumRepository.remove(candidate);
      this.status = StatusCodes.NO_CONTENT;
      message = null;
    }

    if (message) {
      this.logger.error(message, 'AlbumService');
    }

    const updatedArr = (await this.getAll()).data;
    const result: IResponse = {
      data: message ? message : updatedArr,
      statusCode: this.status,
    };
    return result;
  }
}
