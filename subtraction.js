const { isEmpty, getRandDigit, getNonZeroRandDigit, getRandomBool, getRandDigitGreaterThan } = require("./utils");

//Get random Minuend from number of digits
getNewMinuend = (noOfDigits, borrowFlag) => {
    let minuendDigits = [getNonZeroRandDigit()];
    let allDigitsAreNine = true;
    for (let i = 1; i < noOfDigits; ++i) {
        const digit = getRandDigit();
        if (digit !== 9) {
            allDigitsAreNine = false;
        }
        minuendDigits.push(digit);
    }

    // If minuend has all digits equal to 9 then it won't be possible to create borrowable subtrahend.
    // Hence get new minuend and return it in that case.
    if (borrowFlag === true && allDigitsAreNine) {
        return getNewMinuend(noOfDigits, borrowFlag)
    }

    return minuendDigits;
}

//Get random Subtrahend that would require borrow in subtraction from number of digits
getSubtrahendWithBorrow = ({ minuendDigits, noOfDigitsInSubtrahend }) => {
    // Subtrahend array to be returned.
    const subtrahendDigits = [];

    // Save the mineund index where the subtraction will end.
    let minuendDigitIndex = minuendDigits.length - noOfDigitsInSubtrahend;

    // Insert first non-zero digit and Keep track that the borrow has been added or not.
    const firstNonZeroDigit = getNonZeroRandDigit();
    let hasBorrow = minuendDigits[minuendDigitIndex] < firstNonZeroDigit ? true : false;
    subtrahendDigits.push(firstNonZeroDigit);
    --noOfDigitsInSubtrahend;
    ++minuendDigitIndex;

    // Insert rest of the digits
    while (noOfDigitsInSubtrahend > 0) {
        if (hasBorrow) {
            // If borrow has been added already, add borrow at random.
            const digit = minuendDigits[0] < 9 && getRandomBool() ? getRandDigitGreaterThan(minuendDigits[minuendDigitIndex]) : getRandDigit();
            subtrahendDigits.push(digit);
        } else {
            // If borrow has not been added already, add borrow.
            const digit = minuendDigits[0] < 9 ? getRandDigitGreaterThan(minuendDigits[minuendDigitIndex]) : getRandDigit();
            subtrahendDigits.push(digit);
            hasBorrow = true;
        }
        ++minuendDigitIndex;
        --noOfDigitsInSubtrahend;
    }

    return subtrahendDigits;
}

//Get random Subtrahend that wouldn't require borrow in subtraction from number of digits
getSubtrahendWithoutBorrow = ({ minuendDigits, noOfDigitsInSubtrahend }) => {
    const subtractPosition = minuendDigits.length - noOfDigitsInSubtrahend;
    const subtrahendDigits = [];

    for (i = subtractPosition; i < minuendDigits.length; ++i) {
        if (i === subtractPosition) {
            if (minuendDigits[i] === 0) {
                return [0];
            }
            subtrahendDigits.push(minuendDigits[i] === 1 ? 1 : getNonZeroRandDigit(minuendDigits[i]));
        } else {
            subtrahendDigits.push(minuendDigits[i] === 0 ? 0 : getRandDigit(minuendDigits[i]));
        }
    }

    return subtrahendDigits;
}

getIncorrectAnswerDigits = (correctAnswer) => {
    const correctAnswerDigits = [];
    while (correctAnswer > 0) {
        correctAnswerDigits.push(correctAnswer % 10);
        correctAnswer = Math.floor(correctAnswer / 10);
    }

    const finalInCorrectAnswerDigits = [];
    for (let i = correctAnswerDigits.length - 1; i > -1; --i) {
        finalInCorrectAnswerDigits.push(getRandomBool() && getRandomBool() ? getRandDigit() : correctAnswerDigits[i]);
    }

    return finalInCorrectAnswerDigits;
}

getOptions = (correctAnswer) => {
    let options = [-1, -1, -1, -1];
    const correctOptionIndex = getRandDigit(4);
    options[correctOptionIndex] = correctAnswer;

    let optionsToFill = 3;
    let optionsIndex = 0;
    while (optionsToFill > 0) {
        if (options[optionsIndex] === -1) {
            const incorrectAnswer = digitListToNumber(getIncorrectAnswerDigits(correctAnswer));
            if (options.indexOf(incorrectAnswer) === -1) {
                options[optionsIndex] = incorrectAnswer;
                --optionsToFill;
            }
        } else {
            ++optionsIndex;
        }
    }

    return options;
}

digitListToNumber = (digitList) => {
    let num = digitList[0];
    for (let i = 1; i < digitList.length; ++i) {
        num = num * 10 + digitList[i];
    }

    return num;
}

//Create question list
const subtraction = ({ noOfQuestions, noOfDigitsInMinuend, noOfDigitsInSubtrahend, borrowFlag }) => {
    const questionList = [];

    while (questionList.length < noOfQuestions) {
        const minuendDigits = getNewMinuend(noOfDigitsInMinuend, borrowFlag);
        const subtrahendDigits = borrowFlag === true ? getSubtrahendWithBorrow({ minuendDigits, noOfDigitsInSubtrahend }) :
            getSubtrahendWithoutBorrow({ minuendDigits, noOfDigitsInSubtrahend });

        const minuend = digitListToNumber(minuendDigits);
        const subtrahend = digitListToNumber(subtrahendDigits);
        const correctAnswer = minuend - subtrahend;


        const question = {
            "Minuend": minuend,
            "Subtrahend": subtrahend,
            "Correct Answer": correctAnswer,
        };

        // Check applied to again fetch question if failed to add borrow in case of borrowFlag = true.
        if (question["Correct Answer"] > 0 && !isEmpty(question["Correct Answer"]) && !isNaN(question["Correct Answer"])) {
            const options = getOptions(correctAnswer);
            question["Options"] = options;
            questionList.push(question);
        }
    }

    return questionList;
};

module.exports = subtraction;
