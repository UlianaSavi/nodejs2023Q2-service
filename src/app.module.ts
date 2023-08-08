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
import { Artist } from './Artists/artist.entity';
import {
  DB_NAME,
  POSTGRES_HOSTNAME,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from './constants';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    FavoritesModule,
    AuthModule,
    AlbumModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOSTNAME || POSTGRES_HOSTNAME,
      port: +process.env.POSTGRES_PORT || POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME || POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD || POSTGRES_PASSWORD,
      database: process.env.DB_NAME || DB_NAME,
      entities: [Artist],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
