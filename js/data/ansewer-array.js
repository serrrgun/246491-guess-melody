const getUsersAnswer = (answerType, answerTime, count) => {
  let answers = new Array(count).fill({
    correct: answerType,
    time: answerTime
  });
  return answers;
};

export {getUsersAnswer};
