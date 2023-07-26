import { ITrack } from 'src/Tracks/track.model';
import { INewUserPesponse, IUser } from '../Users/user.model';

export interface IResponse {
  data: IUser[] | IUser | INewUserPesponse | ITrack[] | ITrack | string;
  statusCode: number;
}
