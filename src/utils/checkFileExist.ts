import { promises as fs } from 'fs';

export const checkFileExist = async (filePath: string) => {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};
