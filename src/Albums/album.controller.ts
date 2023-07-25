import { Controller } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('api/album')
export class ArtistController {
  constructor(private readonly albumService: AlbumService) {}

  // @Get()
  // init(): string {
  //   return this.albumService.init();
  // }
}
