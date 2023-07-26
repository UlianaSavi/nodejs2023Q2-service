import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  INewUserPesponse,
  IUser,
  UpdatePasswordDto,
} from './user.model';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class UserService {
  users: IUser[] = [];
  status: number | null = null;

  getAll() {
    const result: IResponse = { data: this.users, statusCode: StatusCodes.OK };
    return result;
  }

  getById(id: string) {
    let candidate: IUser | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    candidate = this.users.find((userInDb) => userInDb.id === id);

    if (!isValid) {
      this.status = StatusCodes.BAD_REQUEST;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (isValid && candidate) {
      this.status = StatusCodes.OK;
    }
    if (isValid && !candidate) {
      candidate = null;
      this.status = StatusCodes.NOT_FOUND;
      message = `User with id ${id} - not found!`;
    }

    const result: IResponse = {
      data: message ? message : candidate,
      statusCode: this.status,
    };
    return result;
  }

  createUser(dto: CreateUserDto) {
    let message: string | null = null;
    let newUser: IUser | null = null;
    let userWithoutPassword: INewUserPesponse | null = null;

    if (dto.login && dto.password) {
      newUser = {
        id: uuidv4(),
        login: `${dto.login}`,
        password: `${dto.password}`,
        version: 1,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };

      this.status = StatusCodes.CREATED;

      this.users.push(newUser);
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
    const result: IResponse = {
      data: message ? message : userWithoutPassword,
      statusCode: this.status,
    };
    return result;
  }

  updateUserPassword(id: string, dto: UpdatePasswordDto) {
    let message: string | null = null;
    let userWithoutPassword: INewUserPesponse | null = null;
    const isValid = validate(id);

    const userToUpdateIdx = this.users.findIndex(
      (userInDb) => userInDb.id === id,
    );
    const isValidOldPassword =
      this.users.at(userToUpdateIdx)?.password === dto?.oldPassword;

    if (!this.users.at(userToUpdateIdx)) {
      message = `User with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (!dto?.newPassword || !dto?.oldPassword) {
      message = 'Invalid DTO!';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && this.users.at(userToUpdateIdx) && !isValidOldPassword) {
      message = 'Wrong old password!';
      this.status = StatusCodes.FORBIDDEN;
    }
    if (
      dto.newPassword &&
      dto.oldPassword &&
      isValid &&
      isValidOldPassword &&
      this.users.at(userToUpdateIdx)
    ) {
      this.users.at(userToUpdateIdx).password = dto.newPassword;
      this.users.at(userToUpdateIdx).version =
        this.users.at(userToUpdateIdx).version + 1;
      this.users.at(userToUpdateIdx).updatedAt = new Date().getTime();
      userWithoutPassword = {
        id: this.users.at(userToUpdateIdx).id,
        login: this.users.at(userToUpdateIdx).login,
        version: this.users.at(userToUpdateIdx).version,
        createdAt: this.users.at(userToUpdateIdx).createdAt,
        updatedAt: this.users.at(userToUpdateIdx).updatedAt,
      };

      this.status = StatusCodes.OK;
    }

    const result: IResponse = {
      data: message ? message : userWithoutPassword,
      statusCode: this.status,
    };
    return result;
  }

  deleteUser(id: string) {
    let message: string | null = null;
    const isValid = validate(id);

    const candidate = this.users.find((user) => user.id === id);

    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = StatusCodes.BAD_REQUEST;
    }
    if (isValid && !candidate) {
      message = `User with id ${id} not found!`;
      this.status = StatusCodes.NOT_FOUND;
    }
    if (isValid && candidate) {
      const res = this.users.filter((userInDb) => userInDb.id !== id);
      this.users = res;
      this.status = StatusCodes.NO_CONTENT;
    }
    const result: IResponse = {
      data: message ? message : this.users,
      statusCode: this.status,
    };
    return result;
  }
}
