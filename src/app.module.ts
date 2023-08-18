import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Users/users.module';
import { TrackModule } from './Tracks/track.module';
import { ArtistModule } from './Artists/artist.module';
import { FavoritesModule } from './Favorites/favorites.module';
import { AuthModule } from './Auth/auth.module';
import { AlbumModule } from './Albums/album.module';
import { LoggerModule } from './Logger/logger.module';
import {
  DB_NAME,
  HOSTNAME,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from 'src/constants';
import { Artist } from './Artists/artist.entity';
import { Album } from './Albums/album.entity';
import { Track } from './Tracks/track.entity';
import {
  FavoriteArtist,
  FavoriteAlbum,
  FavoriteTrack,
} from './Favorites/favorites.entity';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    FavoritesModule,
    AuthModule,
    AlbumModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DOCKER_HOST || HOSTNAME,
      port: +process.env.POSTGRES_PORT || POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME || POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD || POSTGRES_PASSWORD,
      database: process.env.DB_NAME || DB_NAME,
      entities: [
        Artist,
        Album,
        Track,
        FavoriteArtist,
        FavoriteAlbum,
        FavoriteTrack,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
