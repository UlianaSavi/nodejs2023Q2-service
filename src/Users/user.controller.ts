import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // base(@Req() req: Request, @Res() res: Response) {
  //   const { method, body, params } = req;
  //   const id = params.id || '';

  //   const userRes = this.userService.init(method, id, body);
  //   const userResDataAsJson = JSON.stringify(userRes.data);
  //   res.status(userRes.statusCode);
  //   res.send(userResDataAsJson);
  // }
}
