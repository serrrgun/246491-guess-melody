import View from './view';

export default class ViewResultFail extends View {

  get template() {
    return `
      <section class="result">
        <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <h2 class="result__title">Какая жалость!</h2>
        <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
        <button class="result__replay" type="button">Попробовать ещё раз</button>
      </section>`;
  }

  bind() {
    this.replayButton = this.element.querySelector(`.result__replay`);
    this.replayButton.addEventListener(`click`, this.onClickReplay);
  }

  onClickReplay() {}
}
