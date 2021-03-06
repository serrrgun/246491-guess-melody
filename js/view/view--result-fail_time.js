import AbstractView from './view';
import Router from "../router";

export default class ViewResultFailTime extends AbstractView {

  get template() {
    return `
      <section class="result">
        <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <h2 class="result__title">Увы и ах!</h2>
        <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
        <button class="result__replay" type="button">Попробовать ещё раз</button>
      </section>`;
  }

  bind() {
    this.replayButton = this.element.querySelector(`.result__replay`);
    this.replayButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Router.showGame();
    });
  }
}
