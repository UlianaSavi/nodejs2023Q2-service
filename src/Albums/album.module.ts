import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/Tracks/track.module';
import { AlbumController } from './album.controller';
import { FavoritesModule } from 'src/Favorites/favorites.module';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavoritesModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
