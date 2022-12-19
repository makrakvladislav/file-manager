import path from "path"
import { createReadStream } from "fs";
import { createHash } from 'crypto';
import { checkArgs } from "../../utils/checkArgs.js";

export const calculateHash = async(args) => {
  if(!checkArgs(args, 1)) return;
  const filePath = path.resolve(args[0].toString().replace(/['"]+/gi, ""));
  const chunks = [];
  const readableStream = createReadStream(filePath, { encoding: "utf-8" });

  try {
    for await (const chunk of readableStream) {
      chunks.push(Buffer.from(chunk));
    }
    const hash = createHash('sha256').update(Buffer.concat(chunks)).digest('hex');
    console.log(hash);
    readableStream.on('error', (error) => {
      console.log('Operation failed');
    })
  } catch(err) {
    return console.log('Operation failed');
  }

}