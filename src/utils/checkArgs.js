export const checkArgs = (args, length) => {
  if (!args || args.length !== length) {
    console.log('Invalid input');
    return false;
  }
  return true;
}