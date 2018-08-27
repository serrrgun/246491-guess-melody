import {INITIAL_GAME, statistic, user, endGame} from "../data/game-data";
import {SONGS} from "../data/music-data";
import {render, changeScreen} from "../utils";
import {calculatePoints} from "../testing-functions/calculate-points";
import {showResult} from "../testing-functions/show-user-result";
import gameGenreScreen from "../templates/game-genre";
import gameArtistScreen from "../templates/game-artists";
import welcomeScreen from "../templates/welcome";
import {gameFailTries} from "../templates/fail-tries";
import header from "../templates/header";
import gameResultScreen from "../templates/result-seccess";
import {modalWarning} from "../templates/warning-modal";
import {playerGameGenre} from "./player";
import {playerGameArtist} from "./player";

const BASE_TIME = 35;
let game;

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  user.clear();
};

const resetModal = () => {
  modalWarning.querySelector(`.modal__button:first-child`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    resetGame();
    changeScreen(welcomeScreen);
    modalWarning.classList.add(`modal--hidden`);
  });
};

const backButton = (item) => {
  const gameBackButton = item.querySelector(`.game__back`);
  gameBackButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    modalWarning.classList.remove(`modal--hidden`);
  });
};

const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);

  let headerTemplate = render(header(game));

  const updateGame = (state, element) => {
    headerTemplate = render(header(state));
    element.appendChild(headerTemplate, element);
    element.appendChild(modalWarning);
  };

  let gameGenre = render(gameGenreScreen(SONGS[game.level]));
  gameGenre.insertBefore(headerTemplate, gameGenre.firstElementChild);
  gameGenre.appendChild(modalWarning);
  changeScreen(gameGenre);

  let gameArtist;

  const actionGameGenre = () => {
    backButton(gameGenre);
    resetModal();

    const gameGenreButtonSubmit = gameGenre.querySelector(`.game__submit`);
    const formGameGenre = gameGenre.querySelector(`.game__tracks`);
    const answers = [...formGameGenre.elements.answer];

    playerGameGenre(formGameGenre);

    answers.forEach((item) => {
      item.addEventListener(`change`, () => {
        gameGenreButtonSubmit.disabled = !(answers.some((it) => it.checked));
      });
    });

    gameGenreButtonSubmit.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const userAnswers = answers.filter((it) => it.checked);
      const result = userAnswers.some((it) => it.value !== SONGS[game.level].answer);

      if (result) {
        try {
          game = endGame(game);
          user.add({result: false, time: BASE_TIME});
          updateGame(game, gameGenre);
          formGameGenre.reset();
          gameGenreButtonSubmit.disabled = true;
        } catch (e) {
          changeScreen(gameFailTries);
          return;
        }
      } else {
        user.add({result: true, time: BASE_TIME});
      }

      gameArtist = render(gameArtistScreen(SONGS[++game.level], game));
      gameArtist.insertBefore(headerTemplate, gameArtist.firstElementChild);
      gameArtist.appendChild(modalWarning);
      changeScreen(gameArtist);
      actionGameArtist();

      formGameGenre.reset();
      gameGenreButtonSubmit.disabled = true;
    });
  };

  actionGameGenre();

  const actionGameArtist = () => {
    backButton(gameArtist);
    resetModal();

    const formArtistGame = gameArtist.querySelector(`.game__artist`);
    const answers = [...formArtistGame.elements.answer];

    playerGameArtist(gameArtist);

    for (const answer of answers) {
      answer.addEventListener(`click`, () => {
        if (answer.value !== SONGS[game.level].question.name) {
          try {
            game = endGame(game);
            updateGame(game, gameArtist);
            formArtistGame.reset();
            user.add({result: false, time: BASE_TIME});
          } catch (e) {
            changeScreen(gameFailTries);
            return;
          }
        } else {
          user.add({result: true, time: BASE_TIME});
        }

        if (SONGS[++game.level]) {
          gameGenre = render(gameGenreScreen(SONGS[game.level], game));
          gameGenre.insertBefore(headerTemplate, gameGenre.firstElementChild);
          gameGenre.appendChild(modalWarning);
          changeScreen(gameGenre);
          actionGameGenre();
        } else {
          const resultUserGame = {
            score: calculatePoints([...user], game.lives),
            lives: game.lives,
            time: BASE_TIME,
          };

          const resultTemplate = render(gameResultScreen(resultUserGame.score, showResult(statistic, resultUserGame), game));

          resultTemplate.querySelector(`.result__replay`).addEventListener(`click`, (event) => {
            event.preventDefault();
            resetGame();
            startGame();
          });

          changeScreen(resultTemplate);
        }

        formArtistGame.reset();
      });
    }
  };
};

export default startGame;
