import View from './view';
import {formatWord} from "../testing-functions/declension-word";

export default class ViewResultSuccess extends View {
  constructor(result, points, game) {
    super();

    this.result = result;
    this.points = points;
    this.game = game;
  }

  get template() {
    return `
    <section class="result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">Вы настоящий меломан!</h2> 
      <p class="result__total">За 3 минуты и 25 секунд вы набрали ${this.points} ${formatWord(this.points, `point`)}, совершив ${3 - this.game.lives} ${formatWord(3 - this.game.lives, `note`)}</p>
      <p class="result__text">${this.result}</p> 
      <button class="result__replay" type="button">Сыграть ещё раз</button>
    </section>`.trim();
  }

  bind() {
    const replayButton = this.element.querySelector(`.result__replay`);
    replayButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onClickReplay();
    });
  }

  onClickReplay() {}
}
