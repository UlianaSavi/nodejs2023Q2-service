import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Users/users.module';
import { TrackModule } from './Tracks/track.module';
import { ArtistModule } from './Artists/artist.module';
import { FavoritesModule } from './Favorites/favorites.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, FavoritesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
