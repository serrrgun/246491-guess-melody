import {assert} from 'chai';
import {getUsersAnswer} from "./ansewer-array";
import {calculatePoints} from "./calculate-points";

describe(`Calculate points`, () => {
  it(`returns -1 if less than 10 questions`, () => {
    assert.equal(calculatePoints(getUsersAnswer(true, 30, 7), 3), -1);
  });
  it(`returns 10 if 10 correct non-fast response`, () => {
    assert.equal(calculatePoints(getUsersAnswer(true, 45, 10), 2), 10);
  });
  it(`returns 20 if 20 correct fast responses`, () => {
    assert.equal(calculatePoints(getUsersAnswer(true, 20, 10), 0), 20);
  });
  it(`returns -20 if 10 incorrect answers`, () => {
    assert.equal(calculatePoints(getUsersAnswer(false, 20, 10), 0), -20);
  });
  it(`returns 8 if 7 correct fast responses and 3 errors`, () => {
    let correctAnswer = getUsersAnswer(true, 20, 7);
    let uncorrectAnswer = getUsersAnswer(false, 45, 3);
    let totalAnswer = correctAnswer.concat(uncorrectAnswer);
    assert.equal(calculatePoints(totalAnswer, 0), 8);
  });
  it(`returns 4 if 8 are not fast correct answers and 2 are not correct`, () => {
    let correctAnswer = getUsersAnswer(true, 35, 8);
    let uncorrectAnswer = getUsersAnswer(false, 35, 2);
    let totalAnswer = correctAnswer.concat(uncorrectAnswer);
    assert.equal(calculatePoints(totalAnswer, 1), 4);
  });
  it(`returns message "Notes should be >= 0"`, () => {
    assert.throw(() => calculatePoints(getUsersAnswer(true, 20, 10), -3), `Notes should be >= 0`);
  });
});
