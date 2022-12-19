import path from "path"
import { constants, createReadStream, createWriteStream } from "fs";
import { access, rm } from "fs/promises"
import { checkArgs } from "../../utils/checkArgs.js";

export const moveFile = async(args) => {
  if(!checkArgs(args, 2)) return;
  const filePath = path.resolve(args[0]);
  const destinationPath = args[1];

  try {
    await access(filePath, constants.R_OK | constants.W_OK);
    return new Promise((resolve) => {
      const fileCopyPath = path.resolve(destinationPath, path.basename(filePath)) 
      const readableStream  = createReadStream(filePath, { flags: 'r'});
      const writableStream = createWriteStream(fileCopyPath, { flags: 'wx'})
  
      readableStream.pipe(writableStream);
      writableStream.on('finish', async() => {
        await rm(filePath);
        resolve()
      });
      writableStream.on('error', async () => {  
        console.log('Operation failed');
        resolve();
      });
    });
  } catch(err) {
    return console.log('Operation failed');
  } 
};