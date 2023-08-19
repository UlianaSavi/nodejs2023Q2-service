import { join } from 'path';
import { promises as fs } from 'fs';
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services';
import { createWriteStream } from 'fs';
import { ILog } from './models/reqLog.model';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  setLogLevels(levels: LogLevel[]): void {
    console.log(levels);
  }

  log(message: string) {
    console.log(message);
  }

  async writeLogToFile(data: ILog, filePath: string, context?: string) {
    const file = createWriteStream(join(process.cwd(), filePath), {
      flags: 'a',
    });

    if (data.type === 'error') {
      try {
        const chunk = `Message: ${
          data?.message
        } ----- Time: ${new Date().getTime()} ----- Context: ${
          context || 'unknown'
        }\n`;

        file.write(chunk);
        return chunk;
      } catch (err) {
        console.log('Error in logger: ', err?.message);
      }
    }
    if (data.type === 'requestLog') {
      try {
        const chunk = `url: ${data?.url} ----- query: ${
          data?.query
        } ----- body: ${JSON.stringify(data?.body, null, 4)}\n`;

        file.write(chunk);
        return chunk;
      } catch (err) {
        console.log('Error in logger: ', err?.message);
      }
    }
    if (data.type === 'responseLog') {
      try {
        const chunk = `statusCode: ${
          data?.statusCode
        } Time: ${new Date().getTime()}\n`;

        file.write(chunk);
        return chunk;
      } catch (err) {
        console.log('Error in logger: ', err?.message);
      }
    }
  }

  async error(message: string, context: string) {
    const filePath = 'src/Logger/logs/errors.log';
    const errorToLog: ILog = {
      type: 'error',
      message,
    };
    const log = await this.writeLogToFile(errorToLog, filePath, context);

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
    const log = await this.writeLogToFile(dataToLog, filePath);

    super.log(`Logger wtite new REQUEST log ----> \n${log}`);
  }

  async responseLog(statusCode: number) {
    const filePath = 'src/Logger/logs/response.log';
    const dataToLog: ILog = {
      type: 'responseLog',
      statusCode,
    };
    const log = await this.writeLogToFile(dataToLog, filePath);

    super.log(`Logger wtite new RESPONSE log ----> \n${log}`);
  }
}
