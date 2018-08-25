import {render, changeScreen} from "../utils.js";
import {gameResultScreen} from "./result-seccess.js";
import {gameFailTries} from "./fail-tries.js";
import {gameFailTime} from "./fail-time.js";
import welcomeScreen from "./welcome.js";
import {INITIAL_GAME} from "../data/game";
import headerTemplate from "./header";

const template = `
<section class="game game--artist">
  ${headerTemplate(INITIAL_GAME)};
  <section class="game__screen">
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio></audio>
    </div>
    <form class="game__artist">
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-1" id="answer-1">
        <label class="artist__name" for="answer-1">
          <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
          Пелагея
        </label>
      </div>
       <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-2" id="answer-2">
        <label class="artist__name" for="answer-2">
          <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
          Краснознаменная дивизия имени моей бабушки
        </label>
      </div>
       <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-3" id="answer-3">
        <label class="artist__name" for="answer-3">
          <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
          Lorde
        </label>
      </div>
    </form>
  </section>
</section>`;


const gameArtistScreen = render(template);

const gameArtistAnswerArray = gameArtistScreen.querySelectorAll(`.artist__input`);
const resultBlockArray = [gameResultScreen, gameFailTries, gameFailTime];
const formGameArtist = gameArtistScreen.querySelector(`.game__artist`);
const resultChange = resultBlockArray[Math.floor(Math.random() * resultBlockArray.length)];

[...gameArtistAnswerArray].forEach((item) => {
  item.addEventListener(`change`, () => {
    formGameArtist.reset();
    changeScreen(resultChange);
  });
});

const gameBackButton = gameArtistScreen.querySelector(`.game__back`);

gameBackButton.addEventListener(`click`, () => {
  formGameArtist.reset();
  changeScreen(welcomeScreen);
});

export {gameArtistScreen};
