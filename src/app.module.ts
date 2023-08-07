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
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'Node-js-server',
      entities: [Artist],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
