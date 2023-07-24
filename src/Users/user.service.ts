import { Injectable } from '@nestjs/common';
import { METHODS } from 'src/constants';
import { CreateUserDto, IUser, UpdatePasswordDto } from './user.model';
import { v4 as uuidv4, validate } from 'uuid';
import { IResponse } from 'src/models/response.model';

@Injectable()
export class UserService {
  users: IUser[] = [];

  getAll() {
    const result: IResponse = { data: this.users, statusCode: 200 };
    return result;
  }

  getById(id: string) {
    let status = 0;
    let candidate: IUser | null = null;
    let message: string | null = null;
    const isValid = validate(id);

    candidate = this.users.find((userInDb) => userInDb.id === id);

    if (isValid && candidate) {
      status = 200;
    }
    if (isValid && !candidate) {
      candidate = null;
      status = 404;
      message = `User with id ${id} - not found!`;
    }

    const result: IResponse = {
      data: message ? message : candidate,
      statusCode: status,
    };
    return result;
  }

  createUser(dto: CreateUserDto) {
    if (dto.login && dto.password) {
      const newUser: IUser = {
        id: uuidv4(),
        login: dto.login,
        password: dto.password,
        version: 0,
        createdAt: new Date().getTime(),
        updatedAt: 0,
      };
      this.users.push(newUser);
      return newUser;
    }
    return null;
  }

  updateUserPassword(dto: UpdatePasswordDto) {
    if (dto.newPassword && dto.oldPassword) {
      const updatedUserIdx = this.users.findIndex(
        (userInDb) => userInDb.password === dto.oldPassword,
      );
      this.users.at(updatedUserIdx).password = dto.newPassword;
      return this.users.at(updatedUserIdx);
    }
    return null;
  }

  deleteUser(id: string) {
    this.users.filter((userInDb) => userInDb.id !== id);
  }

  init(
    method: string,
    id: string | null = null,
    body: IUser | null = null,
  ): IResponse | null {
    if (method === METHODS.GET && !id) {
      return this.getAll();
    }
    if (method === METHODS.GET && id) {
      this.getById(id);
    }
    if (method === METHODS.POST && body) {
      this.createUser(body);
    }
    if (method === METHODS.DELETE && id) {
      this.deleteUser(id);
    }
    return null;
  }
}
