import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(@Res() res: Response) {
    const userRes = this.userService.getAll();
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Get('/:id')
  getUserbyId(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = this.userService.getById(id);
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Post()
  createNewUser(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    const userRes = this.userService.createUser(body);
    const userResDataAsJson = JSON.stringify(userRes.data);

    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Put('/:id')
  updatePass(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    const userRes = this.userService.updateUserPassword(id, body);
    const userResDataAsJson = JSON.stringify(userRes.data);
    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }

  @Delete('/:id')
  deleteUser(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    const userRes = this.userService.deleteUser(id);
    const userResDataAsJson = JSON.stringify(userRes.data);
    res.status(userRes.statusCode);
    res.send(userResDataAsJson);
  }
}
