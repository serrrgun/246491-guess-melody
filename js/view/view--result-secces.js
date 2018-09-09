import View from './view';
import {FULL_TIME} from "../data/game-data";
import {formatWord} from "../bisness-logic/declension-word";
import {getMin, getSec} from "../bisness-logic/change-time";

export default class ViewResultSuccess extends View {
  constructor(model) {
    super();

    this.result = model.endGame;
    this.points = model.scoring;
    this.game = model.state;
    this.fullTime = FULL_TIME;
    this._time = this.fullTime - this.game.time;
    this.min = getMin(this._time);
    this.sec = getSec(this._time);
  }

  get template() {
    return `
    <section class="result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">Вы настоящий меломан!</h2> 
      <p class="result__total">За ${this.min}&#160${formatWord(this.min, `min`)} и ${this.sec}&#160${formatWord(this.sec, `sec`)} вы набрали ${this.points} ${formatWord(this.points, `point`)}, совершив ${3 - this.game.lives} ${formatWord(3 - this.game.lives, `note`)}</p>
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
