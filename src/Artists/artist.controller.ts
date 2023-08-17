import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ArtistService } from './artist.service';
import { TrackService } from 'src/Tracks/track.service';
import { AlbumService } from 'src/Albums/album.service';
import { FavoritesService } from 'src/Favorites/favorites.service';
import { IAlbum } from 'src/Albums/album.model';
import { ITrack } from 'src/Tracks/track.model';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favsService: FavoritesService,
  ) {}

  @Get()
  async getAll(@Res() res: Response) {
    const artistRes = await this.artistService.getAll();
    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const artistRes = await this.artistService.getById(id);
    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const artistRes = await this.artistService.createArtist(body);

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const artistRes = await this.artistService.updateArtist(id, body);
    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const artistRes = await this.artistService.deleteArtist(id);

    if (artistRes.data) {
      // set album.artistId to null after deletion artist
      const albumCandidate = (await this.albumService.getById(id))
        .data as IAlbum;

      if (albumCandidate?.id) {
        const albumDto = {
          name: albumCandidate.name,
          year: albumCandidate.year,
          artistId: null,
        };

        await this.albumService.updateAlbum(id, albumDto);
      }

      // set track.artistId && track.albumId to null after deletion album or artist
      const trackCandidate = (await this.trackService.getById(id))
        .data as ITrack;

      if (trackCandidate?.id) {
        const trackDto = {
          name: trackCandidate.name,
          duration: trackCandidate.duration,
          artistId: null,
          albumId: null,
        };

        await this.trackService.updateTrack(id, trackDto);
      }
    }

    // delete deleted item also from favorites
    try {
      await this.favsService.deleteArtistFromFavs(id);
    } catch (error) {
      res.status(error.statusCode);
    }

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }
}
