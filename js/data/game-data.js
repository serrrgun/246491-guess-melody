const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 300,
});

const statistic = [];
const user = new Set();

const endGame = (game) => {
  if (!endGame(game)) {
    throw new Error(`Game Over`);
  }
  const lives = game.lives - 1;
  return Object.assign({}, game, {
    lives
  });
};

export {INITIAL_GAME, statistic, user, endGame};
