import { Module } from '@nestjs/common';
import { AuthService } from './auth.servise';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/user.entity';
import { LoggerModule } from 'src/Logger/logger.module';
import { UserModule } from 'src/Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LoggerModule,
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
