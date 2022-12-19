import { userInfo } from 'os';

export const getUserName = () => {
  console.log(userInfo().username);
}