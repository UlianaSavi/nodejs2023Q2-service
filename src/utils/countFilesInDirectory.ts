import { readdir } from 'fs/promises';

export const countFilesInDirectory = async (
  dirPath: string,
  filePath: string,
) => {
  try {
    const files = await readdir(dirPath);
    let filesWithSameName = 0;
    const fileName = filePath.slice(16).slice(0, -4).split('-')?.at(0); // slice folder path && extension

    files.forEach((file) => {
      const fileNameInArr = file.slice(0, -4).split('-')?.at(0); // slice axtension
      if (fileNameInArr === fileName) {
        filesWithSameName += 1;
      }
    });

    return filesWithSameName;
  } catch (err) {
    return null;
  }
};
