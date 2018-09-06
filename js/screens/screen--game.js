import modalWarning from './screen--modal-warning';
import screenResultFail from './screen--result-fail';
import ViewHeader from '../view/view--header';
import ViewLevelArtist from '../view/view--level-artist';
import ViewLevelGenre from '../view/view--level-genre';
import {changeScreen} from '../utils';
import {INITIAL_GAME, user, statistic} from '../data/game-data';
import {SONGS} from "../data/music-data";
import {reductionLives} from '../testing-functions/reduction-lives';
import screenResultSucces from './screen--result-secces';
import {calculatePoints} from '../testing-functions/calculate-points';
import {showResult} from '../testing-functions/show-user-result';
import {changeLevel} from '../testing-functions/level-selection';

const TIME = 35;
let game = Object.assign({}, INITIAL_GAME);

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  user.clear();
};

const updateGame = (state, level) => {
  const screenHeader = new ViewHeader(state);
  screenHeader.restartGame = () => {
    level.element.appendChild(modalWarning());
  };
  level.element.insertBefore(screenHeader.element, level.element.firstElementChild);
  changeScreen(level.element);
};

const genreGameLevel = (level) => {
  const gameLevel = new ViewLevelGenre(level);

  gameLevel.onAnswerClick = (answers) => {
    const userAnswers = answers.filter((it) => it.checked);
    const correctResult = userAnswers.some((it) => it.value === level.answer);

    if (correctResult) {
      user.add({result: true, time: TIME});
    } else {
      try {
        game = reductionLives(game);
        user.add({result: false, time: TIME});
        updateGame(game, gameLevel);
      } catch (e) {
        changeScreen(screenResultFail());
        return;
      }
    }
    game = changeLevel(game);

    if (SONGS[game.level]) {
      switch (SONGS[game.level].type) {
        case `genre`:
          updateGame(game, genreGameLevel(SONGS[game.level]));
          break;
        case `artist`:
          updateGame(game, artistGameLevel(SONGS[game.level]));
          break;
        case `end`:
          const resultGame = {
            score: calculatePoints([...user], game.lives),
            lives: game.lives,
            time: TIME,
          };
          changeScreen(screenResultSucces(showResult(statistic, resultGame), resultGame.score, game));
          break;
        default:
          throw new Error(`Unknown Level`);
      }
    }

  };
  return gameLevel;
};

const artistGameLevel = (level) => {

  const gameLevel = new ViewLevelArtist(level);

  gameLevel.onAnswerClick = (answer) => {
    const correctResult = answer.value === level.question.name;

    if (correctResult) {
      user.add({result: true, time: TIME});
    } else {
      try {
        game = reductionLives(game);
        updateGame(game, gameLevel);
        user.add({result: false, time: TIME});
      } catch (e) {
        changeScreen(screenResultFail());
        return;
      }
    }
    game = changeLevel(game);


    if (SONGS[game.level]) {
      switch (SONGS[game.level].type) {
        case `genre`:
          updateGame(game, genreGameLevel(SONGS[game.level]));
          break;
        case `artist`:
          updateGame(game, artistGameLevel(SONGS[game.level]));
          break;
        case `end`:
          const resultGame = {
            score: calculatePoints([...user], game.lives),
            lives: game.lives,
            time: TIME,
          };
          changeScreen(screenResultSucces(showResult(statistic, resultGame), resultGame.score, game));
          break;
        default:
          throw new Error(`Unknown Level`);
      }
    }
  };
  return gameLevel;
};

const startGame = () => {
  resetGame();
  updateGame(game, genreGameLevel(SONGS[game.level]));
};

export {startGame, resetGame};
