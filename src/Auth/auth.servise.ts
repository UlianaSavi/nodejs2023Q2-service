import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusCodes } from 'http-status-codes';
import { User } from 'src/Users/user.entity';
import { CreateUserDto } from 'src/Users/user.model';
import { IResponse } from 'src/models/response.model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/Users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    if (!dto?.login || !dto?.password) {
      return null;
    }
    if (typeof dto?.login !== 'string' || typeof dto?.password !== 'string') {
      return null;
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const dtoWithHashPass = {
      login: dto.login,
      password: hashPassword,
    };

    const res = await this.userService.createUser(dtoWithHashPass);
    return res;
  }

  async login(dto: CreateUserDto) {
    let error: string | null = null;
    let statusCode: null | number = null;

    const user = await this.userRepository.findOneBy({ login: dto.login });

    if (!user?.id) {
      error = 'No user with such login!';
      statusCode = StatusCodes.FORBIDDEN;
    }

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      error = 'Given password doesnt match actual one!';
      statusCode = StatusCodes.FORBIDDEN;
    }

    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    statusCode = StatusCodes.CREATED;

    const result: IResponse = {
      data: error ? error : { accessToken },
      statusCode: statusCode,
    };

    return result;
  }

  refresh = () => {
    console.log('refresh');
  };
}
