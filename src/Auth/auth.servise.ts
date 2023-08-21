import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusCodes } from 'http-status-codes';
import { User } from 'src/Users/user.entity';
import { CreateUserDto } from 'src/Users/user.model';
import { IResponse } from 'src/models/response.model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/Users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const dtoWithHashPass = {
      login: dto.login,
      password: hashPassword,
    };

    const res = await this.userService.createUser(dtoWithHashPass);
    return res;
  }

  async signIn(dto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ login: dto.login });
    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      return null;
    }

    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload);

    const result: IResponse = {
      data: { accessToken },
      statusCode: StatusCodes.CREATED,
    };

    return result;
  }

  refresh = () => {
    console.log('refresh');
  };
}
