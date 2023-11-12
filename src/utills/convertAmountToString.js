const convertAmountToString = function convertAmountToRealityCashNotation(
  amount
) {
  //utill
  const stringAmount = String(amount);
  const insertPoint = 3;
  let countPoint = 0;
  const convertToArray = [];

  [...stringAmount].reverse().forEach((syllable) => {
    convertToArray.push(syllable);
    countPoint += 1;

    if (countPoint === insertPoint) {
      convertToArray.push(',');
      countPoint = 0;
    }
  });

  return convertToArray.reverse().join('');
};

export default convertAmountToString;
