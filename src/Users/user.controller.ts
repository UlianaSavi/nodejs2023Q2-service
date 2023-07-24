import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { IResponse } from 'src/models/response.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id || null;

    let userRes: IResponse | null = null;

    if (id) {
      userRes = this.userService.getById(id);
    }
    if (!id) {
      userRes = this.userService.getAll();
    }

    const userResDataAsJson = JSON.stringify(userRes.data);
    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Post()
  post(@Req() req: Request, @Res() res: Response) {
    const { method, body, params } = req;
    const id = params.id || '';

    const userRes = this.userService.createUser(body);
    const userResDataAsJson = JSON.stringify(userRes.data);
    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }
}
