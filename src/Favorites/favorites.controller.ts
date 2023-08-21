import { Controller, Get, Post, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FavoritesService } from './favorites.service';
import { CustomLoggerService } from 'src/Logger/logger.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private logger: CustomLoggerService,
  ) {}

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const result = await this.favoritesService.getAll();

    this.logger.responseDebug(result.statusCode);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('artist/:id')
  async artists(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.addArtistToFavs(newFavsId);

    this.logger.responseDebug(result.statusCode);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('album/:id')
  async albums(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { params } = req;
    const newFavsId = params.id;
    const result = await this.favoritesService.addALbumToFavs(newFavsId);

    this.logger.responseDebug(result.statusCode);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('track/:id')
  async track(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.addTrackToFavs(newFavsId);

    this.logger.responseDebug(result.statusCode);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('artist/:id')
  async deleteArtist(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.deleteArtistFromFavs(newFavsId);

    this.logger.responseDebug(result.statusCode);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('album/:id')
  async deleteAlbum(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.deleteAlbumFromFavs(newFavsId);

    this.logger.responseDebug(result.statusCode);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('track/:id')
  async deleteTrack(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.deleteTrackFromFavs(newFavsId);

    this.logger.responseDebug(result.statusCode);

    res.status(result.statusCode);
    res.send(result.data);
  }
}
