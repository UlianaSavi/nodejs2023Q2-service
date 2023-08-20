import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services';
import { ILog } from './models/reqLog.model';
import { writeLogToFile } from './logsWriter';

// TODO: добавить ротацию логов и переменную их размера в env +20

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  setLogLevels(levels: LogLevel[]): void {
    this.log(levels.at(0));
  }

  log(message: string) {
    super.log(message);
  }

  async error(message: string, context: string) {
    const filePath = 'src/Logger/logs/errors.log';
    const errorToLog: ILog = {
      type: 'error',
      message,
    };
    const log = await writeLogToFile(errorToLog, filePath, context);

    super.error(`Logger wtite new ERROR log ----> \n${log}`);
  }

  async requestDebug(url: string, query: string, body: string) {
    const filePath = 'src/Logger/logs/request.log';
    const dataToLog: ILog = {
      type: 'requestDebug',
      url,
      query,
      body,
    };
    const log = await writeLogToFile(dataToLog, filePath);
    super.debug(`Logger wtite new REQUEST log ----> \n${log}`);
  }

  async responseDebug(statusCode: number) {
    const filePath = 'src/Logger/logs/response.log';
    const dataToLog: ILog = {
      type: 'responseDebug',
      statusCode,
    };
    const log = await writeLogToFile(dataToLog, filePath);

    super.debug(`Logger wtite new RESPONSE log ----> \n${log}`);
  }

  async uncaughtLog(statusCode: number) {
    const filePath = 'src/Logger/logs/uncaught.log';
    const dataToLog: ILog = {
      type: 'uncaughtLog',
      statusCode,
    };
    const log = await writeLogToFile(dataToLog, filePath);

    this.log(`Logger wtite new UNCAUGHT log ----> \n${log}`);
  }

  verbose(message: string) {
    super.verbose(message);
  }
}
