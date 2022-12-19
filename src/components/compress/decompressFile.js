import path from "path"
import { createBrotliDecompress } from 'zlib';
import { constants, createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises"
import { checkArgs } from "../../utils/checkArgs.js";

export const decompressFile = async(args) => {
  if(!checkArgs(args, 2)) return;
  const filePath = path.basename(args[0], path.extname(args[0]));
  const destinationPath = path.resolve(args[1], filePath) 

  try {
    await access(args[0], constants.R_OK | constants.W_OK);

    return new Promise((resolve) => {
      const readableStream  = createReadStream(args[0], { flags: 'r'});
      const writableStream = createWriteStream(destinationPath, { flags: 'wx'})
  
      readableStream.pipe(createBrotliDecompress()).pipe(writableStream);
      writableStream.on('finish', () => resolve());
      writableStream.on('error', async () => {  
        console.log('Operation failed');
        resolve();
      });
    });
    
  } catch(err) {
    return console.log('Operation failed');
  }
};