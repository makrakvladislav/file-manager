import path from "path"
import { createBrotliCompress } from 'zlib';
import { constants, createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises"
import { checkArgs } from "../../utils/checkArgs.js";

export const compressFile = async(args) => {
  if(!checkArgs(args, 2)) return;
  const filePath = path.resolve(args[0]);
  const destinationPath = path.resolve(args[1], path.basename(filePath + '.brotli'));

  try {
    await access(args[0], constants.R_OK | constants.W_OK);

    return new Promise((resolve) => {
      const readableStream  = createReadStream(filePath);
      const writableStream = createWriteStream(destinationPath)

      readableStream.pipe(createBrotliCompress()).pipe(writableStream);
      writableStream.on('finish', () => resolve());
      writableStream.on('error', async () => {  
        console.log('Operation failed');
        resolve();
      });
    });
   
  } catch(err) {
    console.log('Operation failed');
  }
};