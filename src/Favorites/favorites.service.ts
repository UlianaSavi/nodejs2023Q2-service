import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/models/response.model';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { IFavoritesIds, IFavoritesInstanses } from './favorites.model';
import { IArtist } from 'src/Artists/artist.model';
import { IAlbum } from 'src/Albums/album.model';
import { ITrack } from 'src/Tracks/track.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesIds } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesIds)
    private favoritesRepository: Repository<FavoritesIds>,
  ) {}
  status: number | null = null;

  async getAll(artists: IArtist[], albums: IAlbum[], tracks: ITrack[]) {
    const ids = (await this.favoritesRepository.find()).at(0);
    const favoritesInstanses = await this.getFavoritesInstanses(
      ids,
      artists,
      albums,
      tracks,
    );
    const result: IResponse = {
      data: favoritesInstanses,
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  async getAllIds() {
    const ids = (await this.favoritesRepository.find()).at(0);
    return ids;
  }

  async getFavoritesInstanses(
    ids: IFavoritesIds,
    artists: IArtist[],
    albums: IAlbum[],
    tracks: ITrack[],
  ) {
    let artistsInFavs: IArtist[] | null = null;
    ids.artists.map((id) => {
      artistsInFavs = artists.filter((artist) => artist.id === id);
    });

    let albumsInFavs: IAlbum[] | null = null;
    ids.albums.map((id) => {
      albumsInFavs = albums.filter((album) => album.id === id);
    });

    let tracksInFavs: ITrack[] | null = null;
    ids.tracks.map((id) => {
      tracksInFavs = tracks.filter((track) => track.id === id);
    });

    const res: IFavoritesInstanses = {
      artists: [...artistsInFavs],
      albums: [...albumsInFavs],
      tracks: [...tracksInFavs],
    };

    return res;
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
    if (candidateIdx < 0 && isValid) {
      this.status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = `Artist with id ${artistId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      const newFavIdx = artists.at(candidateIdx).id;

      this.favoritesIds.artists.push(newFavIdx);

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
    if (candidateIdx < 0 && isValid) {
      this.status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = `Track with id ${trackId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      const newFavIdx = tracks.at(candidateIdx).id;

      this.favoritesIds.tracks.push(newFavIdx);

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
    if (candidateIdx < 0 && isValid) {
      this.status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = `Album with id ${albumId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      const newFavIdx = albums.at(candidateIdx).id;

      this.favoritesIds.albums.push(newFavIdx);

      this.status = StatusCodes.CREATED;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async deleteArtistFromFavs(artistId: string) {
    let message: string | null = null;
    const isValid = validate(artistId);

    const ids = await this.getAllIds();

    const candidateIdx = ids.artists.findIndex(
      (artIdInArr) => artIdInArr === artistId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0 && isValid) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Artist with id ${artistId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      this.favoritesIds.artists.splice(candidateIdx, 1);

      this.status = StatusCodes.NO_CONTENT;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async deleteAlbumFromFavs(albumId: string) {
    let message: string | null = null;
    const isValid = validate(albumId);

    const ids = await this.getAllIds();

    const candidateIdx = ids.artists.findIndex(
      (albumIdInArr) => albumIdInArr === albumId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0 && isValid) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Album with id ${albumId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      this.favoritesIds.albums.splice(candidateIdx, 1);

      this.status = StatusCodes.NO_CONTENT;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async deleteTrackFromFavs(trackId: string) {
    let message: string | null = null;
    const isValid = validate(trackId);

    const ids = await this.getAllIds();

    const candidateIdx = ids.artists.findIndex(
      (trackIdInArr) => trackIdInArr === trackId,
    );

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (candidateIdx < 0 && isValid) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Track with id ${trackId} not found!`;
    }
    if (candidateIdx >= 0 && isValid) {
      this.favoritesIds.tracks.splice(candidateIdx, 1);

      this.status = StatusCodes.NO_CONTENT;
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }
}
