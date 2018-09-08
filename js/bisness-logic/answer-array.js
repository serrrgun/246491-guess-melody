const getUsersAnswer = (answerType, answerTime, count) => {
  let answers = new Array(count).fill({
    result: answerType,
    time: answerTime
  });
  return answers;
};

export {getUsersAnswer};
