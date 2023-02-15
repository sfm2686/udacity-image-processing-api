import sharp from 'sharp';
import fs from 'fs';
import path, { resolve } from 'path';

const ABS_FILES_BASE_PATH = 'assets';
const RELATIVE_FILES_BASE_PATH = '../../../assets'

export const resizeImage = async (filename: string, width: number, height: number) => {
  // check if filename is valid
  console.log(path.join(ABS_FILES_BASE_PATH, 'full', filename));
  if (!fs.existsSync(path.join(ABS_FILES_BASE_PATH, 'full', filename))) {
    return '';
  }
  // check if requested file already exists
  const thumbFilename = `${path.parse(filename).name}-w${width}-h${height}.jpg`;
  if (fs.existsSync(path.join(ABS_FILES_BASE_PATH, 'thumb', thumbFilename))) {
    return path.join(resolve(''), ABS_FILES_BASE_PATH, 'thumb', thumbFilename);
    
  }
  // process image
  await sharp(`${path.join(ABS_FILES_BASE_PATH, 'full', filename)}`)
    .resize(width, height)
    .jpeg()
    .toFile(path.join(ABS_FILES_BASE_PATH, 'thumb', thumbFilename));
  return path.join(resolve(''), ABS_FILES_BASE_PATH, 'thumb', thumbFilename);
}