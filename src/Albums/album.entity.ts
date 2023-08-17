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

  @ManyToOne(() => Artist, {
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
    orphanedRowAction: 'nullify',
    nullable: true,
  })
  @JoinColumn()
  artist: Artist;

  @Column({ nullable: true })
  artistId?: string | null;
}
