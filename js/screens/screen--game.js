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
    const result = userAnswers.some((it) => it.value === level.answer);

    if (result) {
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
    updateGame(game, artistGameLevel(SONGS[++game.level]));

  };
  return gameLevel;
};

const artistGameLevel = (level) => {

  const gameLevel = new ViewLevelArtist(level);

  gameLevel.onAnswerClick = (answer) => {
    if (answer.value === SONGS[game.level].question.name) {
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

    if (SONGS[++game.level]) {
      updateGame(game, genreGameLevel(SONGS[game.level]));
    } else {
      const resultGame = {
        score: calculatePoints([...user], game.lives),
        lives: game.lives,
        time: TIME,
      };
      changeScreen(screenResultSucces(showResult(statistic, resultGame), resultGame.score, game));
    }
  };
  return gameLevel;
};

const startGame = () => {
  resetGame();
  updateGame(game, genreGameLevel(SONGS[game.level]));
};

export {startGame, resetGame};
