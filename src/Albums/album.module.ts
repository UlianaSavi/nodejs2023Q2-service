import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/Tracks/track.module';
import { AlbumController } from './album.controller';

@Module({
  imports: [TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
