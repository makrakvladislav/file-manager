import path from "path";
import { realpath } from "fs/promises";
import { checkArgs } from "../../utils/checkArgs.js";

export const changeDir = async(args) => {
  if(!checkArgs(args, 1)) return;
  const dirPath = path.resolve(args[0]);

  try {
    const newDirPath = await realpath(dirPath);
    process.chdir(newDirPath);
  } catch(err) {
    return console.log('Operation failed');
  } 
}