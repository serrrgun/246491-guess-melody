import {assert} from 'chai';
import {getUsersAnswer} from "./answer-array";

describe(`User answer array`, () => {
  it(`must return an array with one object in which the response parameters`, () => {
    assert.deepEqual(getUsersAnswer(true, 40, 1), [{result: true, time: 40}]);
  });

  it(`returns an array with multiple answers`, () => {
    assert.deepEqual(getUsersAnswer(true, 40, 2), [{result: true, time: 40}, {result: true, time: 40}]);
  });
});
