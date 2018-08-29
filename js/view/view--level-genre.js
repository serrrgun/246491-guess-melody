import View from './view';

export default class ViewLevelGenre extends View {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="game game--genre">
      <section class="game__screen">
        <h2 class="game__title">${level.title}</h2>
        <form class="game__tracks">
           ${level.questions.map((question, it) => `
              <div class="track">
                <button class="track__button track__button--play" type="button"></button>
                <div class="track__status">
                  <audio src="${question.src}"></audio>
                </div>
                <div class="game__answer">
                  <input class="game__input visually-hidden" type="checkbox" name="answer" value="${question.genre}" id="answer-${it}">
                  <label class="game__check" for="answer-${it}">Отметить</label>
                </div>
              </div>`.trim()).join(``)}
    
          <button class="game__submit button" type="submit" disabled>Ответить</button>
        </form>
      </section>
    </section>`;
  }

  setStateSendButton() {
    let anyCheckboxChecked = false;
    for (const checkbox of this.checkboxCollection) {
      if (checkbox.checked) {
        anyCheckboxChecked = true;
      }
    }
    this.sendButton.disabled = !anyCheckboxChecked;
  }

  bind() {
    this.sendButton = this.element.querySelector(`.game__submit`);
    this.checkboxCollection = this.element.querySelectorAll(`.game__tracks`);

    for (const checkbox of this.checkboxCollection) {
      checkbox.addEventListener(`change`, this.setStateSendButton.bind(this));
    }

    this.sendButton.addEventListener(`click`, this.onClickSendButton);
  }

  onClickSendButton() {}
}
