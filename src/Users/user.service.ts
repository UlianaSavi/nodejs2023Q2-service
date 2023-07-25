import { Injectable } from '@nestjs/common';
import { CreateUserDto, IUser, UpdatePasswordDto } from './user.model';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';

@Injectable()
export class UserService {
  users: IUser[] = [];
  status: number | null = null;

  getAll() {
    const result: IResponse = { data: this.users, statusCode: 200 };
    return result;
  }

  getById(id: string) {
    let candidate: IUser | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    candidate = this.users.find((userInDb) => userInDb.id === id);

    if (!isValid) {
      this.status = 400;
      message = 'Invalid Id! (Not UUID type.)';
    }
    if (isValid && candidate) {
      this.status = 200;
    }
    if (isValid && !candidate) {
      candidate = null;
      this.status = 404;
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

    if (dto.login && dto.password) {
      newUser = {
        id: uuidv4(),
        login: `${dto.login}`,
        password: `${dto.password}`,
        version: 0,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };

      this.status = 201;

      this.users.push(newUser);
    } else {
      message = 'Incorrect data for operation!';
      this.status = 400;
    }
    const result: IResponse = {
      data: message ? message : newUser,
      statusCode: this.status,
    };
    return result;
  }

  updateUserPassword(id: string, dto: UpdatePasswordDto) {
    let message: string | null = null;
    let updatedUser: IUser | null = null;
    const isValid = validate(id);

    const userToUpdateIdx = this.users.findIndex(
      (userInDb) => userInDb.id === id,
    );
    const isValidOldPassword =
      this.users.at(userToUpdateIdx)?.password === dto?.oldPassword;

    if (!this.users.at(userToUpdateIdx)) {
      message = `User with id ${id} not found!`;
      this.status = 404;
    }
    if (!isValid) {
      message = 'Invalid Id! (Not UUID type.)';
      this.status = 400;
    }

    if (isValid && this.users.at(userToUpdateIdx) && !isValidOldPassword) {
      message = 'Wrong old password!';
      this.status = 403;
    }

    if (
      dto.newPassword &&
      dto.oldPassword &&
      isValid &&
      isValidOldPassword &&
      this.users.at(userToUpdateIdx)
    ) {
      this.users.at(userToUpdateIdx).password = dto.newPassword;
      updatedUser = this.users.at(userToUpdateIdx);
      this.status = 200;
    }

    const result: IResponse = {
      data: message ? message : updatedUser,
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
      this.status = 400;
    }
    if (isValid && !candidate) {
      message = `User with id ${id} not found!`;
      this.status = 404;
    }
    if (isValid && candidate) {
      const res = this.users.filter((userInDb) => userInDb.id !== id);
      this.users = res;
      this.status = 204;
    }
    const result: IResponse = {
      data: message ? message : this.users,
      statusCode: this.status,
    };
    return result;
  }
}
