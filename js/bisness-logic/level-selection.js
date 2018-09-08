const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  if (level > 10) {
    throw new Error(`The game has a maximum of 10 levels`);
  }

  if (level > 10) {
    throw new Error(`The game has a maximum of 10 levels`);
  }

  return Object.assign({}, game, {
    level
  });
};

export {changeLevel};
