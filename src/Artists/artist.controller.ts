import { Controller } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('api/artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // @Get()
  // init(): string {
  //   return this.artistService.init();
  // }
}
