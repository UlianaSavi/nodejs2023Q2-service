import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackModule } from 'src/Tracks/track.module';
import { AlbumModule } from 'src/Albums/album.module';
import { FavoritesModule } from 'src/Favorites/favorites.module';
import { Artist } from './artist.entity';
import { LoggerModule } from 'src/Logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    LoggerModule,
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
