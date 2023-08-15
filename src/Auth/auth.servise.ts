import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): string {
    return 'This is Auth servise :)';
  }

  singup(): string {
    return 'This is Auth servise :)';
  }
}
