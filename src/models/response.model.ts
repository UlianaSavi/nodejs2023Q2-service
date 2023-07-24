import { IUser } from '../Users/user.model';

export interface IResponse {
  data: IUser[] | IUser | string;
  statusCode: number;
}
