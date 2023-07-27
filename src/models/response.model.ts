import { ITrack } from 'src/Tracks/track.model';
import { INewUserPesponse, IUser } from '../Users/user.model';
import { IArtist } from 'src/Artists/artist.model';
import { IAlbum } from 'src/Albums/album.model';
import { IFavoritesInstanses } from 'src/Favorites/favorites.model';

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
    | IFavoritesInstanses
    | string;
  statusCode: number;
}
