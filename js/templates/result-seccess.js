import {formatWord} from "../testing-functions/declension-word";

const template = (points, result, game) => `
  <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За 3 минуты и 25 секунд вы набрали ${points} ${formatWord(points, `point`)}, совершив ${3 - game.lives} ${formatWord(3 - game.lives, `note`)}</p>
    <p class="result__text">${result}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
  </section>`.trim();

export default template;
