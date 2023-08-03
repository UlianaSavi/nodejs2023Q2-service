import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ArtistService } from './artist.service';
import { TrackService } from 'src/Tracks/track.service';
import { AlbumService } from 'src/Albums/album.service';
import { FavoritesService } from 'src/Favorites/favorites.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favsService: FavoritesService,
  ) {}

  @Get()
  async getAll(@Res() res: Response) {
    const artistRes = await this.artistService.getAll();
    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const artistRes = await this.artistService.getById(id);
    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const artistRes = await this.artistService.createArtist(body);

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const artistRes = await this.artistService.updateArtist(id, body);
    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const artistRes = await this.artistService.deleteArtist(id);

    this.trackService.updateAfterDeletion(id);
    this.albumService.updateAfterArtistDeletion(id);

    // delete deleted item also from favorites
    const favsToDelIdx = this.favsService.favoritesIds.artists.findIndex(
      (artistIdx) => artistIdx === id,
    );
    if (favsToDelIdx >= 0) {
      this.favsService.deleteArtistFromFavs(id);
    }

    res.status(artistRes.statusCode);
    res.send(artistRes.data);
  }
}
