import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AlbumService } from './album.service';
import { TrackService } from 'src/Tracks/track.service';
import { FavoritesService } from 'src/Favorites/favorites.service';
import { ITrack } from 'src/Tracks/track.model';
import { CustomLoggerService } from 'src/Logger/logger.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
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

    const albumRes = await this.albumService.getAll();

    this.logger.responseDebug(albumRes.statusCode);

    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const albumRes = await this.albumService.getById(id);

    this.logger.responseDebug(albumRes.statusCode);

    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const albumRes = await this.albumService.createAlbum(body);

    this.logger.responseDebug(albumRes.statusCode);

    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const albumRes = await this.albumService.updateAlbum(id, body);

    this.logger.responseDebug(albumRes.statusCode);

    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const albumRes = await this.albumService.deleteAlbum(id);

    if (albumRes.data) {
      // set track.artistId && track.albumId to null after deletion album or artist
      const trackCandidate = (await this.trackService.getById(id))
        .data as ITrack;
      const trackDto = {
        name: trackCandidate.name,
        duration: trackCandidate.duration,
        artistId: null,
        albumId: null,
      };

      await this.trackService.updateTrack(id, trackDto);
    }

    // delete deleted item also from favorites
    try {
      await this.favsService.deleteAlbumFromFavs(id);
    } catch (error) {
      res.status(error.statusCode);
      this.logger.responseDebug(error.statusCode);
    }

    this.logger.responseDebug(albumRes.statusCode);

    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }
}
