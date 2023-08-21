import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.servise';
import { IResponse } from 'src/models/response.model';
import { Public } from 'src/utils/public.decorator';
import { CustomLoggerService } from 'src/Logger/logger.service';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private logger: CustomLoggerService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { body } = req;

    const signUpRes = await this.authService.signUp(body);

    if (!signUpRes?.data) {
      this.logger.error('Bad password for singIn!', 'AuthService signup');
      res.status(StatusCodes.BAD_REQUEST);
      return;
    }

    this.logger.responseDebug(signUpRes.statusCode);

    res.status(signUpRes.statusCode);
    res.send(signUpRes.data);
  }

  @Public()
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    this.logger.requestDebug(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const { body } = req;

    const singInRes: IResponse = await this.authService.login(body);

    if (singInRes.statusCode === StatusCodes.FORBIDDEN) {
      this.logger.error(singInRes.data as string);
      res.status(StatusCodes.FORBIDDEN);
      return;
    }

    this.logger.responseDebug(singInRes.statusCode);

    res.status(singInRes.statusCode);
    res.send(singInRes.data);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    console.log('refresh');
  }
}
