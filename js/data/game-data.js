const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 300,
});

const SECOND = 1000;
const FULL_TIME = 300;
const statistic = [8, 7, 3, 6];

const user = new Set();

export {INITIAL_GAME, statistic, user, SECOND, FULL_TIME};
