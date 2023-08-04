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
  artirst: Artist | null;

  @OneToOne(() => Album)
  @JoinColumn()
  album: Album | null;

  // TODO: решить трабл с сетингом null
  // ошибка: значение NULL в столбце "artistId" отношения "album" нарушает ограничение NOT NULL

  @OneToOne(() => Track)
  @JoinColumn()
  track: Track | null;
}
