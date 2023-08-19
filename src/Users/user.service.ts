import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  INewUserPesponse,
  UpdatePasswordDto,
} from './user.model';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomLoggerService } from 'src/Logger/logger.service';
import { User } from './user.entity';

@Injectable()
export class UserService {
  status: number | null = null;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private logger: CustomLoggerService,
  ) {
    this.logger.setContext('UserService');
  }

  async getAll() {
    const users = await this.userRepository.find();
    const result: IResponse = {
      data: users.at(0) ? users : [],
      statusCode: StatusCodes.OK,
    };
    return result;
  }

  async getById(id: string) {
    let candidate: User | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.userRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }
    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (isValid && candidate) {
      this.status = StatusCodes.OK;
    }
    if (isValid && !candidate) {
      this.status = StatusCodes.NOT_FOUND;
      message = `User with id ${id} - not found!`;
    }

    if (message) {
      this.logger.error(message, 'UserService');
    }

    const result: IResponse = {
      data: message ? message : candidate,
      statusCode: this.status,
    };
    return result;
  }

  async createUser(dto: CreateUserDto) {
    let message: string | null = null;
    let newUser: User | null = null;
    let userWithoutPassword: INewUserPesponse | null = null;

    if (dto.login && dto.password) {
      newUser = {
        id: uuidv4(),
        login: `${dto.login}`,
        password: `${dto.password}`,
        version: 1,
        createdAt: Math.floor(new Date().getTime() / 1000),
        updatedAt: Math.floor(new Date().getTime() / 1000),
      };

      this.status = StatusCodes.CREATED;

      const res = await this.userRepository.insert(newUser);
      if (res.identifiers.at(0)) {
        this.status = StatusCodes.CREATED;
        message = null;
      } else {
        this.status = StatusCodes.FORBIDDEN;
        message = 'Operation failed!';
      }
    } else {
      message = 'Incorrect data for operation!';
      this.status = StatusCodes.BAD_REQUEST;
    }

    if (!message && newUser) {
      userWithoutPassword = {
        id: newUser.id,
        login: newUser.login,
        version: newUser.version,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };
    }

    if (message) {
      this.logger.error(message, 'UserService');
    }

    const result: IResponse = {
      data: message ? message : userWithoutPassword,
      statusCode: this.status,
    };
    return result;
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    let message: string | null = null;
    let userToUpdate: User | null = null;
    let userWithoutPassword: INewUserPesponse | null = null;
    const isValid = validate(id);

    try {
      userToUpdate = await this.userRepository.findOneBy({ id: id });
    } catch (error) {
      userToUpdate = null;
    }
    const isValidOldPassword = userToUpdate?.password === dto?.oldPassword;

    if (!userToUpdate) {
      message = `User with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (!dto?.newPassword || !dto?.oldPassword) {
      message = 'Invalid DTO!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !!userToUpdate && !isValidOldPassword) {
      message = 'Wrong old password!';
      this.status = StatusCodes.FORBIDDEN;
    }
    if (
      dto.newPassword &&
      dto.oldPassword &&
      isValid &&
      isValidOldPassword &&
      userToUpdate?.id
    ) {
      userToUpdate.password = dto.newPassword;
      userToUpdate.version = userToUpdate.version + 1;
      userToUpdate.updatedAt = Math.floor(new Date().getTime() / 1000) + 1;
      userWithoutPassword = {
        id: userToUpdate.id,
        login: userToUpdate.login,
        version: userToUpdate.version,
        createdAt: userToUpdate.createdAt,
        updatedAt: userToUpdate.updatedAt,
      };

      this.status = StatusCodes.OK;
    }

    if (message) {
      this.logger.error(message, 'UserService');
    }

    const result: IResponse = {
      data: message ? message : userWithoutPassword,
      statusCode: this.status,
    };
    return result;
  }

  async deleteUser(id: string) {
    let message: string | null = null;
    let candidate: User | null = null;
    const isValid = validate(id);

    try {
      candidate = await this.userRepository.findOneBy({ id: id });
    } catch (error) {
      candidate = null;
    }

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `User with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      try {
        await this.userRepository.remove(candidate);
        this.status = StatusCodes.NO_CONTENT;
      } catch (error) {
        message = 'Operation failed!';
      }
    }

    if (message) {
      this.logger.error(message, 'UserService');
    }

    const updatedArr = (await this.getAll()).data;

    const result: IResponse = {
      data: message ? message : updatedArr,
      statusCode: this.status,
    };
    return result;
  }
}
