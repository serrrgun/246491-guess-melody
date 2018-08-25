const showResult = (statistic, userResult) => {
  if (userResult.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии.`;
  }
  if (userResult.notes === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  statistic.push(userResult.score);
  const sortStat = statistic.sort((a, b) => a - b);
  const placeUser = statistic.length - sortStat.indexOf(userResult.score);
  const percent = (((statistic.length - placeUser) / statistic.length) * 100).toFixed(0);
  return `Вы заняли ${placeUser} место из ${statistic.length}. Это лучше, чем у ${percent}% игроков.`;
};

export {showResult};
