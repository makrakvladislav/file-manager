
import { arch } from 'os';

export const getArchitecture = () => {
  console.log(arch());
}