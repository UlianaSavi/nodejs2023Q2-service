import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  init(): string {
    return this.favoritesService.init();
  }
}
