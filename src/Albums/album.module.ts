import { Module } from '@nestjs/common';
import { ArtistController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class ArtistModule {}
