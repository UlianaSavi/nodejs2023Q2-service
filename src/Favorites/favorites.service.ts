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
import { ArtistService } from 'src/Artists/artist.service';
import { TrackService } from 'src/Tracks/track.service';
import { AlbumService } from 'src/Albums/album.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesIds)
    private favoritesRepository: Repository<FavoritesIds>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  status: number | null = null;

  async getAll() {
    const ids = await this.favoritesRepository.find({
      relations: {
        artirst: true,
        album: true,
        track: true,
      },
    });
    const result: IResponse = {
      data: ids.reduce(
        (acc, val) => {
          const res = { ...acc };
          if (val.artirst) {
            res.artists.push(val.artirst);
          }

          if (val.album) {
            res.albums.push(val.album);
          }

          if (val.track) {
            res.tracks.push(val.track);
          }

          return res;
        },
        {
          artists: [],
          albums: [],
          tracks: [],
        },
      ),
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  async addArtistToFavs(artistId: string) {
    let message: string | null = null;
    const isValid = validate(artistId);

    const candidate = (await this.artistService.getById(artistId))
      .data as IArtist;

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (!candidate && isValid) {
      this.status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = `Artist with id ${artistId} not found!`;
    }
    if (candidate && isValid) {
      try {
        await this.favoritesRepository.insert({
          artirst: () => candidate.id,
        });
        this.status = StatusCodes.CREATED;
      } catch (error) {
        message = 'Operation failed!';
      }
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async addTrackToFavs(trackId: string) {
    let message: string | null = null;
    const isValid = validate(trackId);

    // TODO: получить трек и привязать трек к favs

    const candidate = (await this.trackService.getById(trackId)).data as ITrack;

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (!candidate && isValid) {
      this.status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = `Track with id ${trackId} not found!`;
    }
    if (candidate && isValid) {
      try {
        await this.favoritesRepository.insert({
          track: () => candidate.id,
        });
        this.status = StatusCodes.CREATED;
      } catch (error) {
        message = 'Operation failed!';
      }
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async addALbumToFavs(albumId: string) {
    let message: string | null = null;
    const isValid = validate(albumId);

    const candidate = (await this.albumService.getById(albumId)).data as IAlbum;

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (!candidate && isValid) {
      this.status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = `Album with id ${albumId} not found!`;
    }
    if (candidate && isValid) {
      try {
        await this.favoritesRepository.insert({
          album: () => candidate.id,
        });
        this.status = StatusCodes.CREATED;
      } catch (error) {
        message = 'Operation failed!';
      }
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async deleteArtistFromFavs(artistId: string) {
    let candidate: IArtist | null = null;
    let message: string | null = null;
    const isValid = validate(artistId);

    try {
      candidate = (await this.artistService.getById(artistId)).data as IArtist;
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (!candidate && isValid) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Artist with id ${artistId} not found!`;
    }
    if (candidate && isValid) {
      await this.favoritesRepository.remove(candidate.id);

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
