import { cpus } from 'os';

export const getCPUS = () => {
  console.log(`Total cpus: ${cpus().length}`);
  cpus().forEach((item) => {
    console.log(`model: ${item.model}, clock rate: ${(item.speed / 1000).toFixed(2)}GHz`);
  }); 
}