import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavoritesModule } from 'src/Favorites/favorites.module';
import { Track } from './track.entity';
import { Album } from 'src/Albums/album.entity';
import { Artist } from 'src/Artists/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, Album, Artist]),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
