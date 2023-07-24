import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
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
  getCommand(@Req() request: Request): string {
    const command = request.url || '';
    const method = request.method || '';
    switch (command) {
      case COMMANDS.USER:
        this.userService.init(method);
        break;
      default:
        console.log('Unknown command!');
        break;
    }
    return this.appService.init();
  }
}
