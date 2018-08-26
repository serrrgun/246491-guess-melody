import {render, changeScreen} from "../utils.js";
import {gameArtistScreen} from "./game-artists.js";
import welcomeScreen from "./welcome.js";
import {INITIAL_GAME} from "../data/game";
import headerTemplate from "./header";
import song from "../data/music-data.js";

export default () => {

  const templateAnswer = (song) => `
  <div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="${song.id}" value="${song.value}" id="${song.id}">
      <label class="game__check" for="${song.id}">Отметить</label>
    </div>
  </div>`;

  const template = `
  <section class="game game--genre">
     ${headerTemplate(INITIAL_GAME)}
     <section class="game__screen">
      <h2 class="game__title">Выберите инди-рок треки</h2>
      <form class="game__tracks">
         ${new Array(4).fill(templateAnswer(song)).join(``)}
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
  return gameGenreScreen;

};
