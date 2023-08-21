import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ArtistService } from './artist.service';
import { TrackService } from 'src/Tracks/track.service';
import { AlbumService } from 'src/Albums/album.service';
import { FavoritesService } from 'src/Favorites/favorites.service';
import { IAlbum } from 'src/Albums/album.model';
import { ITrack } from 'src/Tracks/track.model';
import { CustomLoggerService } from 'src/Logger/logger.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favsService: FavoritesService,
    private logger: CustomLoggerService,
  ) {}

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const artistRes = await this.artistService.getAll();

    this.logger.responseDebug(artistRes.statusCode);

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { params } = req;
    const id = params.id;

    const artistRes = await this.artistService.getById(id);

    this.logger.responseDebug(artistRes.statusCode);

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { body } = req;

    const artistRes = await this.artistService.createArtist(body);

    this.logger.responseDebug(artistRes.statusCode);

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { body, params } = req;
    const id = params.id;

    const artistRes = await this.artistService.updateArtist(id, body);

    this.logger.responseDebug(artistRes.statusCode);

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

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
      this.logger.responseDebug(artistRes.statusCode);
      res.status(error.statusCode);
    }

    this.logger.responseDebug(artistRes.statusCode);

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }
}
