import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoritesIds {
  @PrimaryColumn('uuid')
  id: string;

  @Column('simple-array', { nullable: true, unique: true })
  artists: string[];

  @Column('simple-array', { nullable: true, unique: true })
  albums: string[];

  @Column('simple-array', { nullable: true, unique: true })
  tracks: string[];
}
