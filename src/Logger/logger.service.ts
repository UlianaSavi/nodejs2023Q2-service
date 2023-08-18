import { join } from 'path';
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services';
import { createWriteStream } from 'fs';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  setLogLevels(levels: LogLevel[]): void {
    console.log(levels);
  }

  log(message: string) {
    console.log(message);
  }

  async writeLogToFile(message: string) {
    const file = createWriteStream(join(process.cwd(), 'src/Logger/logs/errors.logs.txt'), { flags: 'a'});
    try {
      file.write(message);
    } catch (err) {
      console.log('Error in logger: ', err?.message);
    }
  }

  async error(message: string) {
    await this.writeLogToFile(message);
    super.error(message);
  }
}
