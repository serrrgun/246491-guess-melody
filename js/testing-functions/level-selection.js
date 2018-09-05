const changeLevel = (user) => {
  const newLevel = Object.assign({}, user);
  newLevel.level += 1;

  if (newLevel.level > 10) {
    throw new Error(`End Levels`);
  }
  return newLevel;
};

export {changeLevel};
