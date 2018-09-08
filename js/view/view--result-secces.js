import View from './view';
import {FULL_TIME} from "../data/game-data";
import {formatWord} from "../bisness-logic/declension-word";

export default class ViewResultSuccess extends View {
  constructor(model) {
    super();

    this.result = model.endGame;
    this.points = model.scoring;
    this.game = model.state;
    this.fullTime = FULL_TIME;
    this._time = this.fullTime - this.game.time;
    this.min = Math.trunc(this._time / 60);
    this.sec = (((this._time / 60) - this.min) * 60).toFixed(0);
  }

  get template() {
    return `
    <section class="result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">Вы настоящий меломан!</h2> 
      <p class="result__total">За ${this.min > 0 ? `${this.min} ${formatWord(this.sec, `min`)} и` : ``} ${this.sec} ${formatWord(this.sec, `sec`)} вы набрали ${this.points} ${formatWord(this.points, `point`)}, совершив ${3 - this.game.lives} ${formatWord(3 - this.game.lives, `note`)}</p>
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
