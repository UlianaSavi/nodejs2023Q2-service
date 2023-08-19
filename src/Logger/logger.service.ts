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

  async writeLogToFile(message: string) {
    const file = createWriteStream(
      // TODO: проверить, что если папки и/или файла под логи нет - нет и ошибки, а просто создается нужная папка и/или файл
      join(process.cwd(), 'src/Logger/logs/errors.log'),
      { flags: 'a' },
    );
    try {
      file.write(`Message: ${message} ----- Time: ${new Date().getTime()}\n`);
    } catch (err) {
      console.log('Error in logger: ', err?.message);
    }
  }

  async error(message: string) {
    await this.writeLogToFile(message);
    super.error(message);
  }
}
