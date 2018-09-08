const getMin = (time) => {
  const result = Math.floor(time / 60);
  return result < 10 ? `0` + result : result;
};

const getSec = (time)=> {
  const result = (time % 60).toFixed(0);
  return result < 10 ? `0` + result : result;
};

export {getMin, getSec};
