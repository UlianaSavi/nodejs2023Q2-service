import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/models/response.model';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { IFavorites } from './favorites.model';
import { IArtist } from 'src/Artists/artist.model';
import { IAlbum } from 'src/Albums/album.model';
import { ITrack } from 'src/Tracks/track.model';

@Injectable()
export class FavoritesService {
  favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  status: number | null = null;

  getAll() {
    const result: IResponse = {
      data: this.favorites,
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  addArtistToFavs(artistId: string, artists: IArtist[]) {
    let message: string | null = null;
    const isValid = validate(artistId);

    const candidateIdx = artists.findIndex(
      (artInArr) => artInArr.id === artistId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Artist with id ${artistId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      const newFavIdx = artists.at(candidateIdx).id;
      this.favorites.artists.push(newFavIdx);
      this.status = StatusCodes.CREATED;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  addTrackToFavs(trackId: string, tracks: ITrack[]) {
    let message: string | null = null;
    const isValid = validate(trackId);

    const candidateIdx = tracks.findIndex(
      (artInArr) => artInArr.id === trackId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Track with id ${trackId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      const newFavIdx = tracks.at(candidateIdx).id;
      this.favorites.tracks.push(newFavIdx);
      this.status = StatusCodes.CREATED;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  addALbumToFavs(albumId: string, albums: IAlbum[]) {
    let message: string | null = null;
    const isValid = validate(albumId);

    const candidateIdx = albums.findIndex(
      (artInArr) => artInArr.id === albumId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Album with id ${albumId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      const newFavIdx = albums.at(candidateIdx).id;
      this.favorites.albums.push(newFavIdx);
      this.status = StatusCodes.CREATED;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  deleteArtistFromFavs(artistId: string, artists: IArtist[]) {
    let message: string | null = null;
    const isValid = validate(artistId);

    const candidateIdx = artists.findIndex(
      (artInArr) => artInArr.id === artistId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Artist with id ${artistId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      this.favorites.artists.splice(candidateIdx, 1);
      this.status = StatusCodes.NO_CONTENT;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  deleteAlbumFromFavs(albumId: string, albums: IAlbum[]) {
    let message: string | null = null;
    const isValid = validate(albumId);

    const candidateIdx = albums.findIndex(
      (artInArr) => artInArr.id === albumId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Album with id ${albumId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      this.favorites.albums.splice(candidateIdx, 1);
      this.status = StatusCodes.NO_CONTENT;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  deleteTrackFromFavs(trackId: string, tracks: ITrack[]) {
    let message: string | null = null;
    const isValid = validate(trackId);

    const candidateIdx = tracks.findIndex(
      (trackInArr) => trackInArr.id === trackId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Track with id ${trackId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      this.favorites.tracks.splice(candidateIdx, 1);
      this.status = StatusCodes.NO_CONTENT;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }
}
