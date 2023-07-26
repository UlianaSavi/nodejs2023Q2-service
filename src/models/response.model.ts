import { ITrack } from 'src/Tracks/track.model';
import { INewUserPesponse, IUser } from '../Users/user.model';
import { IArtist } from 'src/Artists/artist.model';
import { IAlbum } from 'src/Albums/album.model';

export interface IResponse {
  data:
    | IUser[]
    | IUser
    | INewUserPesponse
    | ITrack[]
    | ITrack
    | IArtist[]
    | IArtist
    | IAlbum[]
    | IAlbum
    | string;
  statusCode: number;
}
