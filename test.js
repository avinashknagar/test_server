let correctAnswer = 231;
const correctAnswerDigits = [];
while (correctAnswer > 0) {
    correctAnswerDigits.push(correctAnswer % 10);
    correctAnswer = Math.floor(correctAnswer / 10);
}

console.log(correctAnswerDigits);