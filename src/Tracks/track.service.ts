import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { ITrack, ITrackDto } from './track.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';
import { Album } from 'src/Albums/album.entity';
import { Artist } from 'src/Artists/artist.entity';

@Injectable()
export class TrackService {
  status: number | null = null;

  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async getAll() {
    const tracks = await this.trackRepository.find();
    const result: IResponse = {
      data: tracks.at(0) ? tracks : [],
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  async getById(id: string) {
    let candidate: ITrack | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.trackRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (isValid && !candidate) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Track with id ${id} - not found!`;
    }
    if (isValid && candidate) {
      this.status = StatusCodes.OK;
      message = null;
    }

    const result: IResponse = {
      data: message ? message : candidate,
      statusCode: this.status,
    };
    return result;
  }

  async createTrack(dto: ITrackDto) {
    let message: string | null = null;
    let newTrack: ITrack | null = null;
    let artist: Artist | null = null;
    let album: Album | null = null;

    if (dto?.albumId && validate(dto?.albumId)) {
      album = await this.albumRepository.findOneBy({ id: dto.albumId });
    }
    if (dto?.artistId && validate(dto?.artistId)) {
      artist = await this.artistRepository.findOneBy({ id: dto.artistId });
    }

    if (dto?.name && dto?.duration) {
      newTrack = {
        id: uuidv4(),
        name: dto.name,
        artist: artist,
        album: album,
        duration: dto.duration,
        albumId: dto.albumId,
        artistId: dto.artistId,
      };
      try {
        await this.trackRepository.insert(newTrack);
        this.status = StatusCodes.CREATED;
        message = null;
      } catch (error) {
        this.status = StatusCodes.FORBIDDEN;
        message = 'Operation failed!';
      }
    } else {
      message = 'Incorrect data for operation!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    const result: IResponse = {
      data: message ? message : newTrack,
      statusCode: this.status,
    };
    return result;
  }

  async updateTrack(id: string, dto: ITrackDto) {
    let candidate: Track | null = null;
    let trackToUpdate: Track | null = null;
    let message: string | null = null;
    let artist: Artist | null = null;
    let album: Album | null = null;

    const isValid = validate(id);

    if (dto?.albumId && validate(dto?.albumId)) {
      album = await this.albumRepository.findOneBy({ id: dto.albumId });
    }
    if (dto?.artistId && validate(dto?.artistId)) {
      artist = await this.artistRepository.findOneBy({ id: dto.artistId });
    }

    try {
      candidate = await this.trackRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (!candidate && isValid) {
      message = `Artist with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (!dto.name?.length || typeof dto?.duration !== 'number') {
      message = 'Invalid DTO!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (
      isValid &&
      typeof dto?.duration === 'number' &&
      dto.name?.length &&
      candidate
    ) {
      trackToUpdate = {
        id: candidate.id,
        name: dto.name,
        duration: dto.duration,
        artist: artist,
        album: album,
        artistId: dto.artistId,
        albumId: dto.albumId,
      };
      try {
        await this.trackRepository.save(trackToUpdate);
        this.status = StatusCodes.OK;
      } catch (error) {
        message = 'Operation failed!';
      }
    }

    const result: IResponse = {
      data: message ? message : trackToUpdate,
      statusCode: this.status,
    };
    return result;
  }

  async deleteTrack(id: string) {
    let candidate: Track | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.trackRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `Track with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      try {
        await this.trackRepository.remove(candidate);
        this.status = StatusCodes.NO_CONTENT;
      } catch (error) {
        message = 'Operation failed!';
      }
    }

    const updatedArr = (await this.getAll()).data;
    const result: IResponse = {
      data: message ? message : updatedArr,
      statusCode: this.status,
    };
    return result;
  }
}
