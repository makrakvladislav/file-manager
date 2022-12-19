import { readdir } from "fs/promises";

export const getDirFiles = async(path) => {
  try {
    const data = await readdir(path, { withFileTypes: true });
    let files = data.map((file) => {
      return {
        'Name': file.name,
        'Type': file.isDirectory() ? 'directory' : 'file',
      };
    });

   files.sort((a, b) => {
    if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
    if (a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
  });

  files.sort((a, b) => {
    if (a.Type.toLowerCase() < b.Type.toLowerCase()) return -1;
    if (a.Type.toLowerCase() > b.Type.toLowerCase()) return 1;
  });
  
    console.table(files);
  } catch(err) {
    console.log('Operation failed');
  };
};