import { Album } from 'src/Albums/album.entity';
import { Artist } from 'src/Artists/artist.entity';
import { Entity, Column, JoinColumn, PrimaryColumn, OneToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  artist: Artist;

  @OneToOne(() => Album, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  album: Album;

  @Column()
  duration: number;
}
