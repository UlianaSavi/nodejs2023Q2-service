import { Album } from '../Albums/album.entity';
import { Artist } from '../Artists/artist.entity';
import { Track } from '../Tracks/track.entity';
import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FavoriteArtist {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Artist)
  @JoinColumn()
  artist: Artist;
}

@Entity()
export class FavoriteAlbum {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Album)
  @JoinColumn()
  album: Album;
}

@Entity()
export class FavoriteTrack {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Track)
  @JoinColumn()
  track: Track;
}
