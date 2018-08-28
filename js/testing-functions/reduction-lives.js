const reductionLives = (user) => {
  const newUser = Object.assign({}, user);
  newUser.lives -= 1;
  if (newUser.lives === 0) {
    throw new Error(`Lives ended`);
  }
  return newUser;
};

export {reductionLives};
