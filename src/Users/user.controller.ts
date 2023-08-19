import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CustomLoggerService } from 'src/Logger/logger.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private logger: CustomLoggerService,
  ) {}

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    this.logger.requestLog(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const userRes = await this.userService.getAll();

    this.logger.responseLog(userRes.statusCode);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    this.logger.requestLog(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const userRes = await this.userService.getById(id);

    this.logger.responseLog(userRes.statusCode);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    const { body } = req;

    this.logger.requestLog(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const userRes = await this.userService.createUser(body);

    this.logger.responseLog(userRes.statusCode);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const { body, params } = req;
    const id = params.id;

    this.logger.requestLog(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      body || '',
    );

    const userRes = await this.userService.updateUserPassword(id, body);

    this.logger.responseLog(userRes.statusCode);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    const { params } = req;
    const id = params.id;

    this.logger.requestLog(
      req?.url || '',
      JSON.stringify(req?.query, null, 4),
      req?.body || '',
    );

    const userRes = await this.userService.deleteUser(id);

    this.logger.responseLog(userRes.statusCode);

    res.status(userRes.statusCode);
    res.send(userRes.data);
  }
}
