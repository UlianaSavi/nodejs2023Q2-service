import { join } from 'path';
import { WriteStream, createWriteStream } from 'fs';
import { ILog } from './models/reqLog.model';
import { checkRotation } from 'src/utils/checkRotation';
import { checkFileExist } from 'src/utils/checkFileExist';
import { countFilesInDirectory } from 'src/utils/countFilesInDirectory';

export async function writeLogToFile(
  data: ILog,
  filePath: string,
  context?: string,
) {
  let rotation = false;
  let file: WriteStream | null = null;
  const check = await checkFileExist(filePath);
  const extension = '.log';
  const fileWithExten = `${filePath}${extension}`;

  // if file exist - compare its size with default log file size
  if (check) {
    rotation = await checkRotation(fileWithExten);
  }

  // if file size more than log file default size
  if (rotation) {
    const dirPath = 'src/Logger/logs/';
    const count = await countFilesInDirectory(
      join(process.cwd(), dirPath),
      fileWithExten,
    );
    const newFilePath = `${filePath}-${count}${extension}`;
    file = createWriteStream(join(process.cwd(), newFilePath), {
      flags: 'a',
    });
  } else {
    file = createWriteStream(join(process.cwd(), fileWithExten), {
      flags: 'a',
    });
  }

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
  if (data.type === 'responseDebug' || data.type === 'uncaughError') {
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
