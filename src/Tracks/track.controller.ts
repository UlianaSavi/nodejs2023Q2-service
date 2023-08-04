import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TrackService } from './track.service';
import { FavoritesService } from 'src/Favorites/favorites.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favsService: FavoritesService,
  ) {}

  @Get()
  async getAll(@Res() res: Response) {
    const trackRes = await this.trackService.getAll();
    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const trackRes = await this.trackService.getById(id);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const trackRes = await this.trackService.createTrack(body);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const trackRes = await this.trackService.updateTrackPassword(id, body);
    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const trackRes = await this.trackService.deleteTrack(id);

    // delete deleted item also from favorites
    try {
      this.favsService.deleteTrackFromFavs(id);
    } catch (error) {
      res.status(error.statusCode);
    }

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }
}
