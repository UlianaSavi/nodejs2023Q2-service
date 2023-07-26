import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AlbumService } from './album.service';
import { TrackService } from 'src/Tracks/track.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  getAll(@Res() res: Response) {
    const albumRes = this.albumService.getAll();
    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Get('/:id')
  getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const albumRes = this.albumService.getById(id);
    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const albumRes = this.albumService.createAlbum(body);

    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Put('/:id')
  update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const albumRes = this.albumService.updateAlbum(id, body);
    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }

  @Delete('/:id')
  delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const albumRes = this.albumService.deleteAlbum(id);

    this.trackService.updateAfterDeletion(id);

    res.status(albumRes.statusCode);
    res.send(albumRes.data);
  }
}
