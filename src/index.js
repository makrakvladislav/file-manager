import { homedir } from "os";
import { createInterface } from "readline";
import { cwd, chdir } from "process";
import { getName } from "./utils/getArgs.js";
import { greetUser } from "./utils/greetUser.js";
import { upDir } from "./components/navigation/upDir.js";
import { getDirFiles } from "./components/navigation/getDirFiles.js";
import { changeDir } from "./components/navigation/changeDir.js";
import { createFile } from "./components/fs/createFile.js";
import { readFile } from "./components/fs/readFile.js";
import { renameFile }  from "./components/fs/renameFile.js";
import { removeFile } from "./components/fs/removeFile.js";
import { copyFile } from "./components/fs/copyfile.js";
import { moveFile } from "./components/fs/moveFile.js";
import { getEOL } from "./components/os/getEOL.js";
import { getCPUS } from "./components/os/getCPUS.js";
import { getHomeDir } from "./components/os/getHomeDir.js";
import { getUserName } from "./components/os/getUserName.js";
import { getArchitecture } from "./components/os/getArchitecture.js";
import { calculateHash } from "./components/hash/calculateHash.js";
import { checkArgs } from "./utils/checkArgs.js";
import { compressFile } from "./components/compress/compressFile.js";
import { decompressFile } from "./components/compress/decompressFile.js";

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

chdir(homedir());
const userName = getName();

greetUser(userName);
console.log(`You are currently in ${cwd()}>`)

readLine.on('line', async (data) => {
  const inputData = data.match(/[^\s"]+|"([^"]*)"/gi);
  const command = inputData[0];
  const args = inputData.slice(1);

  switch(command) {
    case('.exit'): readLine.emit('SIGINT');
      break;
    case('up'): upDir();
      break;
    case('cd'): await changeDir(args);
      break;
    case('ls'): await getDirFiles(cwd());
      break;
    case('cat'): await readFile(args);
      break;
    case('add'): await createFile(args);
      break;
    case('rn'): await renameFile(args);
      break;
    case('cp'): await copyFile(args);
      break;
    case('mv'): await moveFile(args);
      break;
    case('rm'): await removeFile(args);
      break;
    case('os'): getSysInfo(args);
      break; 
    case('hash'): await calculateHash(args);
      break;
    case('compress'): await compressFile(args);
      break;
    case('decompress'): await decompressFile(args);
      break;  
    default: console.log('Invalid input');
  }
  console.log(`You are currently in ${cwd()}>`);
});

const getSysInfo = (args) => {
  if(!checkArgs(args, 1)) return;
  const command = args[0].replace('--', '');
  
  switch(command) {
    case 'EOL': getEOL();
      break;
    case 'cpus': getCPUS();
      break;
    case 'homedir': getHomeDir();
      break;
    case 'username': getUserName();
      break;
    case 'architecture': getArchitecture();
      break;
    default: console.log('Invalid input');
  }
};

readLine.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});

