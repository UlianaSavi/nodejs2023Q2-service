import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login = () => {
    console.log('login');
  };

  refresh = () => {
    console.log('refresh');
  };
}
