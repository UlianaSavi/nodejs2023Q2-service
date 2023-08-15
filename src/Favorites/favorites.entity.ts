import { Album } from '../Albums/album.entity';
import { Artist } from '../Artists/artist.entity';
import { Track } from '../Tracks/track.entity';
import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FavoriteArtist {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  artist: Artist;
}

@Entity()
export class FavoriteAlbum {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  album: Album;
}

@Entity()
export class FavoriteTrack {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Track, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  track: Track;
}
