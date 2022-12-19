import { writeFile } from "fs/promises";
import { checkArgs } from "../../utils/checkArgs.js";

export const createFile = async(args) => {
  if(!checkArgs(args, 1)) return;
  const path = args[0];

  try {
    await writeFile(path, '');
  } catch(err) {
    return console.log('Operation failed');
  };
};