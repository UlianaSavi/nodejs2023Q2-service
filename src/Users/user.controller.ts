import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Res() res: Response) {
    const userRes = this.userService.getAll();
    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Get('/:id')
  getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = this.userService.getById(id);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const userRes = this.userService.createUser(body);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Put('/:id')
  update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const userRes = this.userService.updateUserPassword(id, body);
    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Delete('/:id')
  delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = this.userService.deleteUser(id);
    res.status(userRes.statusCode);
    res.send(userRes.data);
  }
}
