import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { UserService } from './Users/user.service';
import { COMMANDS } from './constants';
import { TrackService } from './Tracks/track.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  router(@Req() req: Request, @Res() res: Response): string {
    const { method, body, path, params } = req;
    const command = path || '';
    const id = params.id || '';

    switch (command) {
      case COMMANDS.USER:
        const userRes = this.userService.init(method, id, body);
        const userResDataAsJson = JSON.stringify(userRes.data);
        res.status(userRes.statusCode);
        res.send(userResDataAsJson);
      default:
        console.log('Unknown command!');
        break;
    }
    return this.appService.init();
  }
}
