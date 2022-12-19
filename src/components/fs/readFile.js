import path from "path"
import { EOL } from "os"
import { stdout } from "process";
import { createReadStream } from "fs";
import { checkArgs } from "../../utils/checkArgs.js";

export const readFile = async(args) => {
  if(!checkArgs(args, 1)) return;
  const filePath = path.resolve(args[0].toString().replace(/['"]+/gi, ""));
  const chunks = [];
  
  try {
    const readableStream = createReadStream(filePath, { encoding: "utf-8" });
    for await (const chunk of readableStream) {
      chunks.push(Buffer.from(chunk));
    }
    readableStream.on('error', (error) => {
      console.log('Operation failed');
    })
    stdout.write(`${Buffer.concat(chunks)} ${EOL}`);
  } catch(err) {
    return console.log('Operation failed');
  }
}