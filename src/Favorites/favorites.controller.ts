import { Controller } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('api/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // @Get()
  // init(): string {
  //   return this.favoritesService.init();
  // }
}
