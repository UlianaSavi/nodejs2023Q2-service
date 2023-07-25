import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.servise';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(): string {
    return this.authService.login();
  }

  @Post('singup')
  singup(): string {
    return this.authService.singup();
  }
}
