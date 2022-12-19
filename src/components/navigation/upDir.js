import path from "path"
import { cwd, chdir } from 'process';

export const upDir = () => {
  chdir(path.dirname(cwd()));
}