import { join } from 'path';
import { createWriteStream } from 'fs';
import { ILog } from './models/reqLog.model';

export async function writeLogToFile(
  data: ILog,
  filePath: string,
  context?: string,
) {
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
