import {render, changeScreen} from "../utils.js";
import {gameArtistScreen} from "./game-artists.js";
import welcomeScreen from "./welcome.js";
import {INITIAL_GAME} from "../data/game";
import headerTemplate from "./header";

const template = `
<section class="game game--genre">
   ${headerTemplate(INITIAL_GAME)};
   <section class="game__screen">
    <h2 class="game__title">Выберите инди-рок треки</h2>
    <form class="game__tracks">
      <div class="track">
        <button class="track__button track__button--play" type="button"></button>
        <div class="track__status">
          <audio></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-1">
          <label class="game__check" for="answer-1">Отметить</label>
        </div>
      </div>
       <div class="track">
        <button class="track__button track__button--play" type="button"></button>
        <div class="track__status">
          <audio></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-2">
          <label class="game__check" for="answer-2">Отметить</label>
        </div>
      </div>
       <div class="track">
        <button class="track__button track__button--pause" type="button"></button>
        <div class="track__status">
          <audio></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-3">
          <label class="game__check" for="answer-3">Отметить</label>
        </div>
      </div>
       <div class="track">
        <button class="track__button track__button--play" type="button"></button>
        <div class="track__status">
          <audio></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-4">
          <label class="game__check" for="answer-4">Отметить</label>
        </div>
      </div>
       <button class="game__submit button" type="submit" disabled>Ответить</button>
    </form>
  </section>
</section>`;


const gameGenreScreen = render(template);
const gameGenreButtonSubmit = gameGenreScreen.querySelector(`.game__submit`);

const gameCheckboxChangeArray = gameGenreScreen.querySelectorAll(`input[type="checkbox"]`);

const setStateSubmitButton = () => {
  let anyCheckboxChecked = false;
  for (const checkbox of gameCheckboxChangeArray) {
    if (checkbox.checked) {
      anyCheckboxChecked = true;
      break;
    }
  }
  gameGenreButtonSubmit.disabled = !anyCheckboxChecked;
};

for (const checkbox of gameCheckboxChangeArray) {
  checkbox.addEventListener(`change`, setStateSubmitButton);
}

gameGenreButtonSubmit.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  gameGenreButtonSubmit.setAttribute(`disabled`, `disabled`);
  formGameGenre.reset();
  changeScreen(gameArtistScreen);
});

const formGameGenre = gameGenreScreen.querySelector(`.game__tracks`);

const gameBackButton = gameGenreScreen.querySelector(`.game__back`);
gameBackButton.addEventListener(`click`, () => {
  formGameGenre.reset();
  changeScreen(welcomeScreen);
});

export {gameGenreScreen};
