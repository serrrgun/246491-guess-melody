import {assert} from 'chai';
import {showResult} from './show-user-result';

describe(`Output of the player's result`, () => {
  it(`The loss of time is out`, () => {
    assert.equal(showResult([1, 2, 7, 9, 10], {score: 6, notes: 3, time: 0}), `Время вышло! Вы не успели отгадать все мелодии.`);
    assert.equal(showResult([4], {score: 1, notes: 3, time: 0}), `Время вышло! Вы не успели отгадать все мелодии.`);
  });
  it(`Loss you have run out`, () => {
    assert.equal(showResult([4, 5, 8, 10, 11], {score: 6, notes: 0, time: 40}), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
    assert.equal(showResult([], {score: 1, notes: 0, time: 60}), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`Victory, you took ... place`, () => {
    assert.equal(showResult([4, 5, 8, 10, 12], {score: 11, lives: 2, time: 40}), `Вы заняли 2 место из 6. Это лучше, чем у 67% игроков.`);
    assert.equal(showResult([4, 8, 10, 11], {score: 5, lives: 1, time: 60}), `Вы заняли 4 место из 5. Это лучше, чем у 20% игроков.`);
  });
});
