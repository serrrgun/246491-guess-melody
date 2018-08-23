import {assert} from 'chai';
import {reductionLives} from "./reduction-lives";

describe(`Managing player lives`, () => {
  it(`Should subtract one life.`, () => {
    assert.deepEqual(reductionLives({score: 6, lives: 3, time: 150}), {score: 6, lives: 2, time: 150});
  });
  it(`Should to report if life ended.`, () => {
    assert.throws(() => reductionLives({score: 12, lives: 1, time: 30}), `Lives ended`);
  });
});
