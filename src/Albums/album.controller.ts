import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller()
export class ArtistController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  init(): string {
    return this.albumService.init();
  }
}
