import { Controller, Post, Req, Res, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/Users/user.service';
import { AuthService } from './auth.servise';
import { HttpExceptionFilter } from 'src/utils/exception.filter';

@Controller('api')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response) {
    const { dto } = req.body;

    // TODO: custom func for getting acsess token
    const signupRes = await this.userService.createUser(dto);

    res.status(signupRes.statusCode);
    res.send(signupRes.data);
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    console.log('login');
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    console.log('refresh');
  }
}
