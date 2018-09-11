import View from './view';
import {getRadius, FULL_TIME, RADIUS, MIN_TIME} from "../bisness-logic/timer-circle";
import {getMin, getSec} from "../bisness-logic/change-time";
import Router from "../router";

export default class ViewHeader extends View {
  constructor(state) {
    super();
    this.state = state;
    this.time = FULL_TIME;
    this.radiusCircle = RADIUS;
    this.minTime = MIN_TIME;
    this.radius = getRadius(this.state.time / this.time, this.radiusCircle);
    this.min = getMin(this.state.time);
    this.sec = getSec(this.state.time);
  }

  get template() {
    return `
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>
       <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370"  filter: url(#blur)
                style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>
       <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">${this.min}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${this.sec}</span>
      </div>
      <div class="game__mistakes">
        ${new Array(this.state.lives).fill(`<div class="wrong"></div>`).join(``)}
      </div>
    </header>`;
  }

  bind() {
    const buttonResetGame = this.element.querySelector(`.game__back`);
    const circle = this.element.querySelector(`.timer__line`);
    const timer = this.element.querySelector(`.timer__value`);


    circle.setAttributeNS(null, `stroke-dasharray`, this.radius.stroke.toString());
    circle.setAttributeNS(null, `stroke-dashoffset`, this.radius.offset.toString());

    if (this.state.time < this.minTime) {
      circle.style.stroke = `red`;
      timer.style.color = `red`;
    }

    if (this.state.time === 0) {
      this.timeEnd();
    }

    buttonResetGame.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.restartGame();
    });
  }

  restartGame() {}

  timeEnd() {
    Router.showFailTime();
  }
}
