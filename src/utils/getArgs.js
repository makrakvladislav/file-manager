export const getName = () => {
  const str = process.argv.slice(2).find((arg) => arg.includes('--username'));
  return str.substring(str.indexOf('=') + 1);
}

