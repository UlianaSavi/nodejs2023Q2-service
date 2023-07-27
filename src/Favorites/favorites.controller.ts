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
  artistsArr: IArtist[] | null = null;
  albumsArr: IAlbum[] | null = null;
  trackArr: ITrack[] | null = null;
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {
    this.artistsArr = this.artistService.artists;
    this.albumsArr = this.albumService.albums;
    this.trackArr = this.trackService.tracks;
  }

  @Get()
  getAll(@Res() res: Response) {
    const trackRes = this.favoritesService.getAll();
    res.status(trackRes.statusCode);
    res.send(trackRes.data);
  }

  @Post('artist/:id')
  artists(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.addArtistToFavs(
      newFavsId,
      this.artistsArr,
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
      this.albumsArr,
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
      this.trackArr,
    );

    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('artist/:id')
  deleteArtist(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.deleteArtistFromFavs(
      newFavsId,
      this.artistsArr,
    );
    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('album/:id')
  deleteAlbum(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.deleteAlbumFromFavs(
      newFavsId,
      this.albumsArr,
    );
    res.status(result.statusCode);
    res.send(result.data);
  }

  @Delete('track/:id')
  deleteTrack(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const newFavsId = params.id;

    const result = this.favoritesService.deleteTrackFromFavs(
      newFavsId,
      this.trackArr,
    );
    res.status(result.statusCode);
    res.send(result.data);
  }
}
