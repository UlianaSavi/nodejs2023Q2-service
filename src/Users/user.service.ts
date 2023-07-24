import { Injectable } from '@nestjs/common';
import { METHODS } from 'src/constants';

@Injectable()
export class UserService {
  getAll() {
    console.log('getAll');
  }

  getById(id: string) {
    console.log('getById. This is id: ', id);
  }

  createUser(dto: string) {
    console.log('createUser. This is dto: ', dto);
  }

  deleteUser(id: string) {
    console.log('deleteUser. This is id: ', id);
  }

  init(
    method: string,
    id: string | null = null,
    dto: string | null = null,
  ): string {
    if (method === METHODS.GET && !id) {
      this.getAll();
    }
    if (method === METHODS.GET && id) {
      this.getById(id);
    }
    if (method === METHODS.POST && dto) {
      this.createUser(dto);
    }
    if (method === METHODS.DELETE && id) {
      this.deleteUser(id);
    }
    return 'This is User servise :)';
  }
}
