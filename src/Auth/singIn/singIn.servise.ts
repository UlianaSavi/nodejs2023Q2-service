import { Injectable } from '@nestjs/common';

@Injectable()
export class SingInService {
  init(): string {
    return 'This is SingIn servise :)';
  }
}
