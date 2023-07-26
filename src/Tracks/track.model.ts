export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface ITrackDto {
  name: string;
  duration: number;
  artistId: any;
  albumId: any;
}
