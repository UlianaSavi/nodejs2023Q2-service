import { Module, forwardRef } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistModule } from 'src/Artists/artist.module';
import { AlbumModule } from 'src/Albums/album.module';
import { TrackModule } from 'src/Tracks/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoriteArtist,
  FavoriteAlbum,
  FavoriteTrack,
} from './favorites.entity';
import { LoggerModule } from 'src/Logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteArtist]),
    TypeOrmModule.forFeature([FavoriteAlbum]),
    TypeOrmModule.forFeature([FavoriteTrack]),
    LoggerModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
