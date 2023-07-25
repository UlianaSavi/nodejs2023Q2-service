import { Module } from '@nestjs/common';
import { SingUpService } from './singUp.servise';
import { SingUpController } from './singUp.controller';

@Module({
  imports: [],
  controllers: [SingUpController],
  providers: [SingUpService],
  exports: [SingUpService],
})
export class SingUpModule {}
