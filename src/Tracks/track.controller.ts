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
  getAll(@Res() res: Response) {
    const trackRes = this.trackService.getAll();
    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Get('/:id')
  getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const trackRes = this.trackService.getById(id);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const trackRes = this.trackService.createTrack(body);

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Put('/:id')
  update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const trackRes = this.trackService.updateTrackPassword(id, body);
    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Delete('/:id')
  delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const trackRes = this.trackService.deleteTrack(id);

    // delete deleted item also from favorites
    const favsToDelIdx = this.favsService.favoritesIds.tracks.findIndex(
      (trackIdx) => trackIdx === id,
    );

    if (favsToDelIdx >= 0) {
      this.favsService.deleteTrackFromFavs(id);
    }

    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }
}
