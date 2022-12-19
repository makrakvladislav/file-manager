import path from "path"
import { rename, access } from "fs/promises";
import { constants } from "fs";
import { checkArgs } from "../../utils/checkArgs.js";

export const renameFile = async(args) => {
  if(!checkArgs(args, 2)) return;
  const filePath = path.resolve(args[0]);
  const fileName = path.resolve(args[1]);

  try {
    await access(filePath, constants.R_OK | constants.W_OK);
    rename(filePath, fileName);
  } catch(err) {
    return console.log('Operation failed');
  }
};