import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { IArtist, IArtistDto } from './artist.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  status: number | null = null;

  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async getAll() {
    const artists = await this.artistRepository.find();
    const result: IResponse = {
      data: artists.at(0) ? artists : [],
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  async getById(id: string) {
    let candidate: IArtist | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.artistRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }
    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (isValid && candidate) {
      this.status = StatusCodes.OK;
    }
    if (isValid && !candidate) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Artist with id ${id} - not found!`;
    }

    const result: IResponse = {
      data: message ? message : candidate,
      statusCode: this.status,
    };
    return result;
  }

  async createArtist(dto: IArtistDto) {
    let message: string | null = null;
    let newArtist: IArtist | null = null;

    if (!dto.name?.length || typeof dto?.grammy !== 'boolean') {
      message = 'Incorrect data for operation!';
      this.status = StatusCodes.BAD_REQUEST;
    } else {
      newArtist = {
        id: uuidv4(),
        name: dto.name,
        grammy: dto.grammy,
      };
      const res = await this.artistRepository.insert(newArtist);
      if (res.identifiers.at(0)) {
        this.status = StatusCodes.CREATED;
        message = null;
      } else {
        this.status = StatusCodes.FORBIDDEN;
        message = 'Operation failed!';
      }
    }
    const result: IResponse = {
      data: message ? message : newArtist,
      statusCode: this.status,
    };
    return result;
  }

  async updateArtist(id: string, dto: IArtistDto) {
    let candidate: IArtist | null = null;
    let artistToUpdate: IArtist | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.artistRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!candidate) {
      message = `Artist with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (!dto.name?.length || typeof dto?.grammy !== 'boolean') {
      message = 'Invalid DTO!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (
      isValid &&
      typeof dto?.grammy === 'boolean' &&
      dto.name?.length &&
      candidate
    ) {
      artistToUpdate = {
        id: candidate.id,
        name: dto.name,
        grammy: dto.grammy,
      };
      try {
        await this.artistRepository.save(artistToUpdate);
        this.status = StatusCodes.OK;
      } catch (error) {
        message = 'Operation failed!';
      }
    }

    const result: IResponse = {
      data: message ? message : artistToUpdate,
      statusCode: this.status,
    };
    return result;
  }

  async deleteArtist(id: string) {
    let candidate: IArtist | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.artistRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `Artist with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      try {
        await this.artistRepository.remove(candidate);
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
