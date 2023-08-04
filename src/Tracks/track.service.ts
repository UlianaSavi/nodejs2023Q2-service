import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { ITrack, ITrackDto } from './track.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';
import { IAlbum } from 'src/Albums/album.model';

@Injectable()
export class TrackService {
  status: number | null = null;

  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
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
    if (isValid && candidate) {
      this.status = StatusCodes.OK;
    }
    if (isValid && !candidate) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Track with id ${id} - not found!`;
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

    if (dto.name && dto.duration) {
      newTrack = {
        id: uuidv4(),
        name: dto.name,
        artistId: dto.artistId,
        albumId: dto.albumId,
        duration: dto.duration,
      };

      const res = await this.trackRepository.insert(newTrack);
      if (res.identifiers.at(0)) {
        this.status = StatusCodes.CREATED;
        message = null;
      } else {
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
    let candidate: ITrack | null = null;
    let trackToUpdate: ITrack | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.trackRepository.findOneBy({ id: id });
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

  async updateTrackPassword(id: string, dto: ITrackDto) {
    let message: string | null = null;
    let candidate: ITrack | null = null;
    let trackToUpdate: ITrack | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.trackRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!candidate) {
      message = `Track with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (!dto.name || !dto.duration) {
      message = 'Invalid DTO!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && dto?.duration && dto?.name && candidate) {
      trackToUpdate = {
        id: candidate.id,
        name: dto.name,
        artistId: dto.artistId,
        albumId: dto.albumId,
        duration: dto.duration,
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
    let candidate: ITrack | null = null;
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
