import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  init(): string {
    return 'This is Track servise :)';
  }
}
