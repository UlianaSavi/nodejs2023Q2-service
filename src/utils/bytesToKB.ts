export const bytesToKB = (bytes: number) => {
  const size = 'KB';

  if (bytes == 0) {
    return null;
  }

  const i = parseInt(String(Math.floor(Math.log(bytes)) / Math.log(1024)));

  if (i == 0) {
    return Number(bytes + ' ' + size);
  }

  return bytes / Math.pow(1024, i);
};
