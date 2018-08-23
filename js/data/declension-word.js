const words = {
  min: [`минуту`, `минуты`, `минут`],
  sec: [`секунду`, `секунды`, `секунд`],
  note: [`ошибку`, `ошибки`, `ошибок`],
  point: [`балл`, `балла`, `баллов`],
  fast: [`быстрый`, `быстрых`, `быстрых`]
};

const formatWord = (number, item) => {
  const word = words[item];
  if ((number === 1) || (number > 20 && number % 10 === 1)) {
    return word[0];
  } else if ((number >= 2 && number <= 4) || (number > 20 && number % 10 >= 2 && number % 10 <= 4)) {
    return word[1];
  } else {
    return word[2];
  }
};

export {formatWord};
