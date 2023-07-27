import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { IArtist, IArtistDto } from './artist.model';

@Injectable()
export class ArtistService {
  artists: IArtist[] = [];
  status: number | null = null;

  getAll() {
    const result: IResponse = {
      data: this.artists,
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  getById(id: string) {
    let candidate: IArtist | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    candidate = this.artists.find((artist) => artist.id === id);

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

  createArtist(dto: IArtistDto) {
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

      this.status = StatusCodes.CREATED;
      this.artists.push(newArtist);
    }
    const result: IResponse = {
      data: message ? message : newArtist,
      statusCode: this.status,
    };
    console.log('artist CREATED', newArtist);
    return result;
  }

  updateArtist(id: string, dto: IArtistDto) {
    let message: string | null = null;
    const isValid = validate(id);

    const artistToUpdateIdx = this.artists.findIndex((art) => art.id === id);

    if (artistToUpdateIdx < 0) {
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
      this.artists.at(artistToUpdateIdx) &&
      artistToUpdateIdx >= 0
    ) {
      this.artists.at(artistToUpdateIdx).grammy = dto.grammy;
      this.artists.at(artistToUpdateIdx).name = dto.name;
      this.status = StatusCodes.OK;
    }

    const result: IResponse = {
      data: message ? message : this.artists.at(artistToUpdateIdx),
      statusCode: this.status,
    };
    return result;
  }

  deleteArtist(id: string) {
    let message: string | null = null;
    const isValid = validate(id);

    const candidate = this.artists.find((artist) => artist.id === id);

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `Artist with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      const res = this.artists.filter((ArtistInDb) => ArtistInDb.id !== id);
      this.artists = res;
      this.status = StatusCodes.NO_CONTENT;
    }
    const result: IResponse = {
      data: message ? message : this.artists,
      statusCode: this.status,
    };
    return result;
  }
}
