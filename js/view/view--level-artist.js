import View from './view';

export default class ViewLevelArtist extends View {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="game game--artist">
      <section class="game__screen">
        <h2 class="game__title">${level.title}</h2>
        <div class="game__track">
          <button class="track__button track__button--play track__button--pause" type="button"></button>
          <audio src="${level.question.src}" autoplay></audio>
        </div>
    
        <form class="game__artist">
          ${level.answers.map((answer, it) => `
            <div class="artist">
              <input class="artist__input visually-hidden" type="radio" name="answer" value="${answer.name}" id="answer-${it}">
              <label class="artist__name" for="answer-${it}">
                <img class="artist__picture" src="${answer.image}" alt="${answer.name}">
                ${answer.name}
              </label>
            </div>`.trim()).join(``)}
        </form>
      </section>
    </section>`.trim();
  }

  bind() {
    this.answerCollection = this.element.querySelectorAll(`.artist__input`);

    for (const answer of this.answerCollection) {
      answer.addEventListener(`change`, this.onAnswerClick);
    }
  }

  onAnswerClick() {}
}
