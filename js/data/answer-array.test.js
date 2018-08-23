import {assert} from 'chai';
import {getUsersAnswer} from "./ansewer-array";

describe(`User answer array`, () => {
  it(`must return an array with one object in which the response parameters`, () => {
    assert.deepEqual(getUsersAnswer(true, 40, 1), [{correct: true, time: 40}]);
  });

  it(`returns an array with multiple answers`, () => {
    assert.deepEqual(getUsersAnswer(true, 40, 2), [{correct: true, time: 40}, {correct: true, time: 40}]);
  });
});
