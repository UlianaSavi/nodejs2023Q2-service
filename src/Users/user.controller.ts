import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Res() res: Response) {
    console.log(2);
    const userRes = this.userService.getAll();
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
    return userResDataAsJson;
  }

  @Get('/:id')
  getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = this.userService.getById(id);
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
    return userResDataAsJson;
  }

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const userRes = this.userService.createUser(body);
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
    return userResDataAsJson;
  }

  @Put('/:id')
  update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const userRes = this.userService.updateUserPassword(id, body);
    const userResDataAsJson = JSON.stringify(userRes.data);
    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
    return userResDataAsJson;
  }

  @Delete('/:id')
  delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = this.userService.deleteUser(id);
    const userResDataAsJson = JSON.stringify(userRes.data);
    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
    return userResDataAsJson;
  }
}
