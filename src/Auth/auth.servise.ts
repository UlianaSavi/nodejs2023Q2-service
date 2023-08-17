import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login = () => {
    console.log('signup');
  };

  refresh = () => {
    console.log('signup');
  };
}
