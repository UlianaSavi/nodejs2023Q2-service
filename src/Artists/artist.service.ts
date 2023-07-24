import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  init(): string {
    return 'This is Artist servise :)';
  }
}
