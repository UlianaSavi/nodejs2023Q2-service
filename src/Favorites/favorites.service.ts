import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/models/response.model';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { IArtist } from 'src/Artists/artist.model';
import { IAlbum } from 'src/Albums/album.model';
import { ITrack } from 'src/Tracks/track.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from './favorites.entity';
import { ArtistService } from 'src/Artists/artist.service';
import { TrackService } from 'src/Tracks/track.service';
import { AlbumService } from 'src/Albums/album.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteAlbum)
    private favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteArtist)
    private favoriteArtistRepository: Repository<FavoriteArtist>,
    @InjectRepository(FavoriteTrack)
    private favoriteTrackRepository: Repository<FavoriteTrack>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  status: number | null = null;

  async getAll() {
    const artists = await this.favoriteArtistRepository.find({
      relations: {
        artist: true,
      },
    });
    const albums = await this.favoriteAlbumRepository.find({
      relations: {
        album: true,
      },
    });
    const tracks = await this.favoriteTrackRepository.find({
      relations: {
        track: true,
      },
    });

    const result: IResponse = {
      data: {
        artists: artists.map((artist) => artist.artist),
        albums: albums.map((album) => album.album),
        tracks: tracks.map((track) => track.track),
      },
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
        await this.favoriteArtistRepository.insert({
          artist: () => candidate.id,
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
        await this.favoriteTrackRepository.insert({
          track: () => candidate.id,
        });
        this.status = StatusCodes.CREATED;
      } catch (error) {
        message = 'Operation failed!';
        this.status = StatusCodes.CONFLICT;
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
        await this.favoriteAlbumRepository.insert({
          album: () => candidate.id,
        });
        this.status = StatusCodes.CREATED;
      } catch (error) {
        message = 'Operation failed!';
        this.status = StatusCodes.CONFLICT;
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
      const artistsFavs = await this.favoriteArtistRepository.find({
        relations: {
          artist: true,
        },
      });

      const artistToDel = artistsFavs.find(
        (favs) => favs.artist.id === candidate.id,
      );

      try {
        await this.favoriteArtistRepository.remove(artistToDel);
        this.status = StatusCodes.NO_CONTENT;
      } catch (error) {
        message = 'Operation failed!';
        this.status = StatusCodes.CONFLICT;
      }
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async deleteAlbumFromFavs(albumId: string) {
    let candidate: IAlbum | null = null;
    let message: string | null = null;
    const isValid = validate(albumId);

    try {
      candidate = (await this.albumService.getById(albumId)).data as IAlbum;
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (!candidate && isValid) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Album with id ${albumId} not found!`;
    }
    if (candidate && isValid) {
      const albumsFavs = await this.favoriteAlbumRepository.find({
        relations: {
          album: true,
        },
      });

      const albumToDel = albumsFavs.find(
        (favs) => favs.album.id === candidate.id,
      );

      try {
        await this.favoriteAlbumRepository.remove(albumToDel);
        this.status = StatusCodes.NO_CONTENT;
      } catch (error) {
        message = 'Operation failed!';
        this.status = StatusCodes.CONFLICT;
      }
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }

  async deleteTrackFromFavs(trackId: string) {
    let candidate: ITrack | null = null;
    let message: string | null = null;
    const isValid = validate(trackId);

    try {
      candidate = (await this.trackService.getById(trackId)).data as ITrack;
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (!candidate && isValid) {
      this.status = StatusCodes.NOT_FOUND;
      message = `Track with id ${trackId} not found!`;
    }
    if (candidate && isValid) {
      const tracksFavs = await this.favoriteTrackRepository.find({
        relations: {
          track: true,
        },
      });

      const trackToDel = tracksFavs.find(
        (favs) => favs.track.id === candidate.id,
      );

      try {
        await this.favoriteTrackRepository.remove(trackToDel);
        this.status = StatusCodes.NO_CONTENT;
      } catch (error) {
        message = 'Operation failed!';
        this.status = StatusCodes.CONFLICT;
      }
    }

    const result: IResponse = {
      data: message,
      statusCode: this.status,
    };
    return result;
  }
}
