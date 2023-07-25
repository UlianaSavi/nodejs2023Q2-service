import { Module } from '@nestjs/common';
import { SingInService } from './singIn.servise';
import { SingInController } from './singIn.controller';

@Module({
  imports: [],
  controllers: [SingInController],
  providers: [SingInService],
  exports: [SingInService],
})
export class SingInModule {}
