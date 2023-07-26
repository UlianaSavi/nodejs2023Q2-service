export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
export interface IAlbumDto {
  name: string;
  year: number;
  artistId: any;
}
