import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  init(): string {
    return 'This is Favorites servise :)';
  }
}
