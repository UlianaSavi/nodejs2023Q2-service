import { Album } from 'src/Albums/album.entity';
import { Artist } from 'src/Artists/artist.entity';
import { Track } from 'src/Tracks/track.entity';
import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FavoritesIds {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Artist)
  @JoinColumn()
  artirst: Artist;

  @OneToOne(() => Album)
  @JoinColumn()
  album: Album;

  @OneToOne(() => Track)
  @JoinColumn()
  track: Track;
}
