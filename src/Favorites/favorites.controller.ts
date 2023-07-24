import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // @Get()
  // init(): string {
  //   return this.favoritesService.init();
  // }
}
