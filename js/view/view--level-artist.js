import View from './view';
import {DEBAG, DEBUG_STYLE_ARTIST} from "../setting";

export default class ViewLevelArtist extends View {
  constructor(level) {
    super();
    this.debag = DEBAG;
    this.debagStyle = DEBUG_STYLE_ARTIST;
    this.level = level;
  }

  get template() {
    return `
    <section class="game game--artist">
      <section class="game__screen">
        <h2 class="game__title">${this.level.question}</h2>
        <div class="game__track">
          <button class="track__button track__button--play track__button--pause" type="button"></button>
          <audio src="${this.level.src}" autoplay></audio>
        </div>
        <form class="game__artist">
          ${this.level.answers.map((answer, it) => this.templateAnswer(answer, it).trim()).join(``)}
        </form>
      </section>
    </section>`.trim();
  }

  templateAnswer(answer, it) {
    return `
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="${answer.isCorrect}" id="answer-${it}">
        <label class="artist__name" ${this.debag && answer.isCorrect === true ? this.debagStyle : ``}  for="answer-${it}">
          <img class="artist__picture" src="${answer.image.url}" alt="${answer.title}">
          ${answer.title}
        </label>
      </div>`;
  }

  bind() {
    const gameArtistForm = this.element.querySelector(`.game__artist`);
    const gameArtistAnswers = [...gameArtistForm.elements.answer];

    const playButtons = this.element.querySelector(`.track__button`);
    const audioPlayer = this.element.querySelector(`audio`);

    playButtons.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      playButtons.classList.toggle(`track__button--pause`);

      if (playButtons.classList.contains(`track__button--pause`)) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    });

    for (const answer of gameArtistAnswers) {
      answer.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const correctResult = answer.value === `true`;
        this.onAnswerClick(correctResult);
        gameArtistForm.reset();
      });
    }
  }

  onAnswerClick() {}
}
