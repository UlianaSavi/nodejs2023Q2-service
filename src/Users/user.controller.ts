import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const userRes = await this.userService.getAll();
    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = await this.userService.getById(id);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const userRes = await this.userService.createUser(body);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const userRes = await this.userService.updateUserPassword(id, body);
    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = await this.userService.deleteUser(id);
    res.status(userRes.statusCode);
    res.send(userRes.data);
  }
}
