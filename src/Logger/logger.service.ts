import { LoggerService } from '@nestjs/common';

export class CustomLoggerService implements LoggerService {
  log(message: string) {
    console.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
}
