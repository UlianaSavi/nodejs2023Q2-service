import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { ITrack, ITrackDto } from './track.model';

@Injectable()
export class TrackService {
  tracks: ITrack[] = [];
  status: number | null = null;

  getAll() {
    const result: IResponse = { data: this.tracks, statusCode: StatusCodes.OK };
    return result;
  }

  getById(id: string) {
    let candidate: ITrack | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    candidate = this.tracks.find((track) => track.id === id);

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

  createTrack(dto: ITrackDto) {
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

      this.status = StatusCodes.CREATED;
      this.tracks.push(newTrack);
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

  updateTrackPassword(id: string, dto: ITrackDto) {
    let message: string | null = null;
    const isValid = validate(id);

    const TrackToUpdateIdx = this.tracks.findIndex((track) => track.id === id);

    if (TrackToUpdateIdx < 0) {
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
    if (
      isValid &&
      dto?.duration &&
      dto?.name &&
      this.tracks.at(TrackToUpdateIdx) &&
      TrackToUpdateIdx >= 0
    ) {
      this.tracks.at(TrackToUpdateIdx).albumId = dto.albumId;
      this.tracks.at(TrackToUpdateIdx).artistId = dto.artistId;
      this.tracks.at(TrackToUpdateIdx).duration = dto.duration;
      this.tracks.at(TrackToUpdateIdx).name = dto.name;

      this.status = StatusCodes.OK;
    }

    const result: IResponse = {
      data: message ? message : this.tracks.at(TrackToUpdateIdx),
      statusCode: this.status,
    };
    return result;
  }

  deleteTrack(id: string) {
    let message: string | null = null;
    const isValid = validate(id);

    const candidate = this.tracks.find((track) => track.id === id);

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `Track with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      const res = this.tracks.filter((TrackInDb) => TrackInDb.id !== id);
      this.tracks = res;
      this.status = StatusCodes.NO_CONTENT;
    }
    const result: IResponse = {
      data: message ? message : this.tracks,
      statusCode: this.status,
    };
    return result;
  }

  // set track.artistId && track.albumId to null after deletion album or artist
  updateAfterDeletion(id: string) {
    const candidateIdx = this.tracks.findIndex(
      (track) => track.artistId === id,
    );
    if (this.tracks.at(candidateIdx)) {
      this.tracks.at(candidateIdx).artistId = null;
      this.tracks.at(candidateIdx).albumId = null;
    }
  }
}
