import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/Tracks/track.module';
import { AlbumController } from './album.controller';
import { FavoritesModule } from 'src/Favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Artist } from 'src/Artists/artist.entity';
import { LoggerModule } from 'src/Logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album, Artist]),
    LoggerModule,
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
