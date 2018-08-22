import {assert} from 'chai';
import {getUsersAnswer} from "./ansewer-array";

describe(`User Answer`, () => {
  it(`must return an array with one object in which the response parameters`, () => {
    assert.equal(getUsersAnswer(true, 40, 1), [{correct: true, time: 40}]);
  });
});
