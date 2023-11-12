export const shortenWords = (str, length = 300) => {
  let result = '';
  if (str.length > length) {
    result = str.substr(0, length - 2) + '...';
  } else {
    result = str;
  }
  return result;
};