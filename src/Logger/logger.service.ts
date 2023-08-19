import { join } from 'path';
import { promises as fs } from 'fs';
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

  async check(fileToRead: string) {
    try {
      await fs.access(fileToRead, fs.constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  async writeLogToFile(message: string, context: string) {
    const file = createWriteStream(
      join(process.cwd(), 'src/Logger/logs/errors.log'),
      { flags: 'a' },
    );
    try {
      const chunk = `Message: ${message} ----- Time: ${new Date().getTime()} ----- Context: ${context}\n`;
      file.write(chunk);
      return chunk;
    } catch (err) {
      console.log('Error in logger: ', err?.message);
    }
  }

  async error(message: string, context: string) {
    const log = await this.writeLogToFile(message, context);
    super.error(`Logger wtite new error log ----> \n${log}`);
  }
}
