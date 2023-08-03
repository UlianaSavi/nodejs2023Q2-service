import { Controller, Get, Post, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FavoritesService } from './favorites.service';
import { ArtistService } from 'src/Artists/artist.service';
import { IArtist } from 'src/Artists/artist.model';
import { AlbumService } from 'src/Albums/album.service';
import { IAlbum } from 'src/Albums/album.model';
import { TrackService } from 'src/Tracks/track.service';
import { ITrack } from 'src/Tracks/track.model';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  getAll(@Res() res: Response) {
    const result = this.favoritesService.getAll();
    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('artist/:id')
  async artists(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const artistData = (await this.artistService.getAll()).data;

    const result = this.favoritesService.addArtistToFavs(
      newFavsId,
      artistData as IArtist[],
    );

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('album/:id')
  albums(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.addALbumToFavs(
      newFavsId,
      this.albumService.getAll().data as IAlbum[],
    );

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('track/:id')
  track(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.addTrackToFavs(
      newFavsId,
      this.trackService.getAll().data as ITrack[],
    );

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('artist/:id')
  deleteArtist(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.deleteArtistFromFavs(newFavsId);
    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('album/:id')
  deleteAlbum(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.deleteAlbumFromFavs(newFavsId);
    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('track/:id')
  deleteTrack(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.deleteTrackFromFavs(newFavsId);
    res.status(result.statusCode);
    res.send(result.data);
  }
}
