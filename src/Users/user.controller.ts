import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { IResponse } from 'src/models/response.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Res() res: Response) {
    const userRes = this.userService.getAll();
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Get('/:id')
  getbyId(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = this.userService.getById(id);
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Post()
  post(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const userRes = this.userService.createUser(body);
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Put('/:id')
  put(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const userRes = this.userService.updateUserPassword(id, body);
    const userResDataAsJson = JSON.stringify(userRes.data);
    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }
}
