import { INewUserPesponse, IUser } from '../Users/user.model';

export interface IResponse {
  data: IUser[] | IUser | INewUserPesponse | string;
  statusCode: number;
}
