import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TrackService } from './track.service';
import { FavoritesService } from 'src/Favorites/favorites.service';
import { CustomLoggerService } from 'src/Logger/logger.service';

@Controller('track')
export class TrackController {
  constructor(
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

    const trackRes = await this.trackService.getAll();

    this.logger.responseDebug(trackRes.statusCode);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
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

    const trackRes = await this.trackService.getById(id);

    this.logger.responseDebug(trackRes.statusCode);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { body } = req;

    const trackRes = await this.trackService.createTrack(body);

    this.logger.responseDebug(trackRes.statusCode);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
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

    const trackRes = await this.trackService.updateTrack(id, body);

    this.logger.responseDebug(trackRes.statusCode);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
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

    const trackRes = await this.trackService.deleteTrack(id);

    // delete deleted item also from favorites
    try {
      this.favsService.deleteTrackFromFavs(id);
    } catch (error) {
      res.status(error.statusCode);
      this.logger.responseDebug(error.statusCode);
    }

    this.logger.responseDebug(trackRes.statusCode);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }
}
