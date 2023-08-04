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
  async getAll(@Res() res: Response) {
    const artistData = (await this.artistService.getAll()).data as IArtist[];
    const albumData = (await this.albumService.getAll()).data as IAlbum[];
    const trackData = (await this.trackService.getAll()).data as ITrack[];

    const result = await this.favoritesService.getAll(
      artistData,
      albumData,
      trackData,
    );

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
  async albums(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;
    const albumData = (await this.albumService.getAll()).data as IAlbum[];

    const result = this.favoritesService.addALbumToFavs(newFavsId, albumData);

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Post('track/:id')
  async track(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;
    const trackData = (await this.trackService.getAll()).data as ITrack[];

    const result = this.favoritesService.addTrackToFavs(newFavsId, trackData);

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
