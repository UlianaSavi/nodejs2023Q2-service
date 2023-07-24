import { Controller, Get } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // @Get()
  // init(): string {
  //   return this.artistService.init();
  // }
}
