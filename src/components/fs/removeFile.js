import path from "path"
import { rm } from "fs/promises";
import { checkArgs } from "../../utils/checkArgs.js";

export const removeFile = async(args) => {
  if(!checkArgs(args, 1)) return;
  const filePath = path.resolve(args[0]);

  try {
    await rm(filePath);
  } catch (err) {
    return console.log('Operation failed');
  }
}