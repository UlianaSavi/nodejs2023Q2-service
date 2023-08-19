import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services';
import { ILog } from './models/reqLog.model';
import { writeLogToFile } from './logsWriter';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  setLogLevels(levels: LogLevel[]): void {
    console.log(levels);
  }

  log(message: string) {
    console.log(message);
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

  async requestLog(url: string, query: string, body: string) {
    const filePath = 'src/Logger/logs/request.log';
    const dataToLog: ILog = {
      type: 'requestLog',
      url,
      query,
      body,
    };
    const log = await writeLogToFile(dataToLog, filePath);

    super.log(`Logger wtite new REQUEST log ----> \n${log}`);
  }

  async responseLog(statusCode: number) {
    const filePath = 'src/Logger/logs/response.log';
    const dataToLog: ILog = {
      type: 'responseLog',
      statusCode,
    };
    const log = await writeLogToFile(dataToLog, filePath);

    super.log(`Logger wtite new RESPONSE log ----> \n${log}`);
  }
}
