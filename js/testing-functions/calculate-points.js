const MAX_NUMBER_OF_REPLIES = 10;
const FAST_TIME = 30;

const POINTS = {
  LOOSE: -1,
  DEFAULT: 1,
  FAST: 2,
  ERROR: -2
};

const calculatePoints = (answers, notes) => {
  let points = 0;
  if (answers.length < MAX_NUMBER_OF_REPLIES) {
    return POINTS.LOOSE;
  }
  if (notes < 0) {
    throw new Error(`Notes should be >= 0`);
  }
  answers.forEach((answer) => {
    if (answer.correct && answer.time < FAST_TIME) {
      points += POINTS.FAST;
    }
    if (answer.correct && answer.time >= FAST_TIME) {
      points += POINTS.DEFAULT;
    }
    if (!answer.correct) {
      points += POINTS.ERROR;
    }
  });
  return points;
};

export {calculatePoints};
