const express = require('express');
const app = express();

// Setting enviroment variables
require('./config');

// Setting middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Imports
const subtraction = require('./subtraction');
const { isEmpty } = require('./utils');

// Main Subtraction API exposed
app.post('/subtraction', (req, res) => {
  if (isEmpty(req.body) ||
    isEmpty(req.body.noOfQuestions) ||
    isEmpty(req.body.noOfDigitsInMinuend) ||
    isEmpty(req.body.noOfDigitsInSubtrahend) ||
    isEmpty(req.body.borrowFlag) ||
    req.body.noOfDigitsInMinuend < 1 ||
    req.body.noOfDigitsInMinuend > 10 ||
    req.body.noOfDigitsInSubtrahend < 1 ||
    req.body.noOfDigitsInSubtrahend > 10 ||
    req.body.noOfDigitsInMinuend < req.body.noOfDigitsInSubtrahend ||
    req.body.noOfDigitsInMinuend === 1 && req.body.borrowFlag === true) {
    return res.status(400).send("Bad Request");
  }

  const noOfQuestions = req.body.noOfQuestions;
  const noOfDigitsInMinuend = req.body.noOfDigitsInMinuend;
  const noOfDigitsInSubtrahend = req.body.noOfDigitsInSubtrahend;
  const borrowFlag = req.body.borrowFlag;

  const questionList = subtraction({ noOfQuestions, noOfDigitsInMinuend, noOfDigitsInSubtrahend, borrowFlag });
  res.status(200).send(questionList);
});

//Starting the server. Removed env for easy deployment.
const port = 7000;  //process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});