let countPoint = 0;

const convertAmountToString = function convertToRealityCashNotation(amount) {
  const convertToArray = [];

  [...String(amount)].reverse().forEach((syllable) => {
    convertToArray.push(syllable);
    countPoint += 1;

    if (countPoint === 3) {
      convertToArray.push(',');
      countPoint = 0;
    }
  });
  countPoint = 0;
  return convertToArray.reverse().join('');
};

export default convertAmountToString;
