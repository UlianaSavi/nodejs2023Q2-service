// this func check log file size if < defaul log size && return boolean

import { promises as fs } from 'fs';
import { join } from 'path';
import { bytesToKB } from './bytesToKB';
import { MAX_LOG_FILE_SIZE } from 'src/constants';

export async function checkRotation(filePath: string) {
  const size = (await fs.stat(join(process.cwd(), filePath))).size; // in bytes
  const sizeInBytes = bytesToKB(size);
  const maxSize = +process.env.MAX_LOG_FILE_SIZE || MAX_LOG_FILE_SIZE;
  if (sizeInBytes >= maxSize) {
    return true;
  }
  return false;
}
