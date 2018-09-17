import View from './view';
import {formatWord} from "../bisness-logic/declension-word";
import Router from "../router";

export default class ViewResultSuccess extends View {
  constructor(model) {
    super();

    this.score = model.score;
    this.lives = model.lives;
    this.text = model.text;
    this._time = model.time;
    this.min = Math.floor(this._time / 60);
    this.sec = Math.floor(this._time % 60);
  }

  get template() {
    return `
    <section class="result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">Вы настоящий меломан!</h2> 
      <p class="result__total">За ${this.min}&#160${formatWord(this.min, `min`)} и ${this.sec}&#160${formatWord(this.sec, `sec`)} вы набрали ${this.score} ${formatWord(this.score, `point`)}, совершив ${3 - this.lives} ${formatWord(3 - this.lives, `note`)}</p>
      <p class="result__text">${this.text}</p>
      <button class="result__replay" type="button">Сыграть ещё раз</button>
    </section>`.trim();
  }

  bind() {
    const replayButton = this.element.querySelector(`.result__replay`);
    replayButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Router.showWelcome();
    });
  }
}
