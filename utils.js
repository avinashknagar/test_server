//Fing if an object is empty
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

//Get random digit less than given digit, 
//Return random digit between 0 to 9 if no upper limit is given
const getRandDigit = digitLessThan =>
  isEmpty(digitLessThan) ? Math.floor(Math.random() * 10) :
    (Math.floor(Math.random() * 10)) % digitLessThan;

//Get Non-Zero random digit less than given digit, 
//Return random digit between 0 to 9 if no upper limit is given
const getNonZeroRandDigit = digitLessThan => {
  let randDigit = -1;
  const digitGreaterThan = isEmpty(digitLessThan) ? 9 : digitLessThan - 1;
  while (randDigit < 1 || randDigit > digitGreaterThan) {
    randDigit = Math.floor(Math.random() * 10);
  }

  return randDigit;
}

const getRandDigitGreaterThan = digitGreaterThan =>
    9 - (Math.floor(Math.random() * 10)) % (9 - (isEmpty(digitGreaterThan) ? 0 : digitGreaterThan));

//Get true or false randomly
const getRandomBool = () =>
  (Math.floor(Math.random() * 10)) % 2 === 0 ? false : true;

module.exports.isEmpty = isEmpty;
module.exports.getRandDigit = getRandDigit;
module.exports.getNonZeroRandDigit = getNonZeroRandDigit;
module.exports.getRandomBool = getRandomBool;
module.exports.getRandDigitGreaterThan = getRandDigitGreaterThan;