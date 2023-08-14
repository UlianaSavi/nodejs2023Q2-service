import { Artist } from 'src/Artists/artist.entity';
import { Entity, JoinColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Album {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  artist: Artist;
}
