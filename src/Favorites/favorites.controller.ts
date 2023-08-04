import { Controller, Get, Post, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FavoritesService } from './favorites.service';
import { IArtist } from 'src/Artists/artist.model';
import { IAlbum } from 'src/Albums/album.model';
import { ITrack } from 'src/Tracks/track.model';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const result = await this.favoritesService.getAll();

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('artist/:id')
  async artists(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.addArtistToFavs(newFavsId);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('album/:id')
  async albums(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;
    const result = await this.favoritesService.addALbumToFavs(newFavsId);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('track/:id')
  async track(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.addTrackToFavs(newFavsId);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('artist/:id')
  async deleteArtist(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.deleteArtistFromFavs(newFavsId);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('album/:id')
  async deleteAlbum(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.deleteAlbumFromFavs(newFavsId);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('track/:id')
  async deleteTrack(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = await this.favoritesService.deleteTrackFromFavs(newFavsId);

    res.status(result.statusCode);
    res.send(result.data);
  }
}
