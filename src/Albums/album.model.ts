import { Artist } from 'src/Artists/artist.entity';

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artist?: Artist;
  artistId?: string;
}
export interface IAlbumDto {
  name: string;
  year: number;
  artistId: any;
}
