import { Injectable } from '@nestjs/common';

@Injectable()
export class SingUpService {
  init(): string {
    return 'This is SingUp servise :)';
  }
}
