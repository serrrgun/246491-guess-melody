import {INITIAL_GAME} from "../data/game-data";

const Points = {
  DEFAULT: 1,
  FAST: 2,
  WRONG: -2
};

export const calculatePoints = (answersUsers, lives) => {
  if (!Array.isArray(answersUsers)) {
    throw new Error(`The first parameter must be an array`);
  }

  if (typeof lives !== `number`) {
    throw new Error(`The second parameter must be a number`);
  }

  if (lives < 0) {
    throw new Error(`The second parameter must be a positive number`);
  }

  if (answersUsers.length < 10 || lives === 0) {
    return -1;
  }
  const BEST_TIME = 30;
  let points = 0;

  for (let answer of answersUsers) {
    if (answer.result) {
      points += INITIAL_GAME.time - answer.time >= BEST_TIME ? Points.DEFAULT : Points.FAST;
    } else if (!(answer.result)) {
      points += Points.WRONG;
    }
  }
  return points;
};

