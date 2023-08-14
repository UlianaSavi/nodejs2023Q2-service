import { Album } from 'src/Albums/album.entity';
import { Artist } from 'src/Artists/artist.entity';

export interface ITrack {
  id: string;
  name: string;
  artist?: Artist;
  artistId?: string;
  album?: Album;
  albumId?: string;
  duration: number;
}

export interface ITrackDto {
  name: string;
  duration: number;
  artistId: any;
  albumId: any;
}
