import { ITrack } from 'src/Tracks/track.model';
import { INewUserPesponse, IUser } from '../Users/user.model';
import { IArtist } from 'src/Artists/artist.model';
import { IAlbum } from 'src/Albums/album.model';
import { IFavoritesInstanses } from 'src/Favorites/favorites.model';
import { Album } from 'src/Albums/album.entity';
import { Track } from 'src/Tracks/track.entity';

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
    | Album
    | Album[]
    | Track
    | Track[]
    | { accessToken: string }
    | string;
  statusCode: number;
}
