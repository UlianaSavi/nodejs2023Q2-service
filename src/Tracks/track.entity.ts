import { Album } from 'src/Albums/album.entity';
import { Artist } from 'src/Artists/artist.entity';
import { Entity, Column, JoinColumn, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, {
    eager: true,
    onDelete: 'SET NULL',
    orphanedRowAction: 'nullify',
    nullable: true,
  })
  @JoinColumn()
  artist: Artist;

  @ManyToOne(() => Album, {
    eager: true,
    onDelete: 'SET NULL',
    orphanedRowAction: 'nullify',
    nullable: true,
  })
  @JoinColumn()
  album: Album;

  @Column()
  duration: number;
}
