import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { IAlbum, IAlbumDto } from './album.model';

@Injectable()
export class AlbumService {
  albums: IAlbum[] = [];
  status: number | null = null;

  getAll() {
    const result: IResponse = {
      data: this.albums,
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  getById(id: string) {
    let candidate: IAlbum | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    candidate = this.albums.find((album) => album.id === id);

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (isValid && candidate) {
      this.status = StatusCodes.OK;
    }
    if (isValid && !candidate) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Album with id ${id} - not found!`;
    }

    const result: IResponse = {
      data: message ? message : candidate,
      statusCode: this.status,
    };
    return result;
  }

  createAlbum(dto: IAlbumDto) {
    let message: string | null = null;
    let newAlbum: IAlbum | null = null;

    if (!dto?.name?.length || !dto?.year) {
      message = 'Incorrect data for operation!';
      this.status = StatusCodes.BAD_REQUEST;
    } else {
      newAlbum = {
        id: uuidv4(),
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
      };

      this.status = StatusCodes.CREATED;
      this.albums.push(newAlbum);
    }
    const result: IResponse = {
      data: message ? message : newAlbum,
      statusCode: this.status,
    };
    return result;
  }

  updateAlbum(id: string, dto: IAlbumDto) {
    let message: string | null = null;
    const isValid = validate(id);

    const albumToUpdateIdx = this.albums.findIndex((art) => art.id === id);

    if (albumToUpdateIdx < 0) {
      message = `Album with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (!dto?.name?.length || !dto?.year) {
      message = 'Invalid DTO!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (
      isValid &&
      dto?.name?.length &&
      dto?.year &&
      this.albums.at(albumToUpdateIdx) &&
      albumToUpdateIdx >= 0
    ) {
      this.albums.at(albumToUpdateIdx).name = dto.name;
      this.albums.at(albumToUpdateIdx).year = dto.year;
      this.albums.at(albumToUpdateIdx).artistId = dto.artistId;
      this.status = StatusCodes.OK;
    }

    const result: IResponse = {
      data: message ? message : this.albums.at(albumToUpdateIdx),
      statusCode: this.status,
    };
    return result;
  }

  deleteAlbum(id: string) {
    let message: string | null = null;
    const isValid = validate(id);

    const candidate = this.albums.find((album) => album.id === id);

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `Album with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      const res = this.albums.filter((AlbumInDb) => AlbumInDb.id !== id);
      this.albums = res;
      this.status = StatusCodes.NO_CONTENT;
    }
    const result: IResponse = {
      data: message ? message : this.albums,
      statusCode: this.status,
    };
    return result;
  }

  // set album.artistId to null after deletion artist
  updateAfterArtistDeletion(id: string) {
    const candidateIdx = this.albums.findIndex(
      (albums) => albums.artistId === id,
    );
    if (this.albums.at(candidateIdx)) {
      this.albums.at(candidateIdx).artistId = null;
    }
  }
}
