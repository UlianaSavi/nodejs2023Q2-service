import { Module } from '@nestjs/common';
import { CustomLoggerService } from './Logger.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
