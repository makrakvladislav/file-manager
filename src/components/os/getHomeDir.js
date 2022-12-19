import { homedir } from 'os';

export const getHomeDir = () => {
  console.log(homedir());
}