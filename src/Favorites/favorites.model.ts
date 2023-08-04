import { IAlbum } from 'src/Albums/album.model';
import { IArtist } from 'src/Artists/artist.model';
import { ITrack } from 'src/Tracks/track.model';

export interface IFavoritesIds {
  id: number;
  artirstId: string;
  albumId: string;
  trackId: string;
}

export interface IFavoritesInstanses {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
