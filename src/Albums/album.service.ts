import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  init(): string {
    return 'This is Album servise :)';
  }
}
