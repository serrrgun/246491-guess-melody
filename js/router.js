import GameModel from './data/game-model';
import GameScreen from './controllers/screen--game';
import WelcomeScreen from './controllers/screen--welcome';
import ResultFailScreen from './controllers/screen--result-fail_tries';
import ResultFailTimeScreen from './controllers/screen--result-fail_time';
import ResultScreen from './controllers/screen--result-secces';
import {changeScreen} from './utils';
import {SONGS} from './data/music-data';


export default class Router {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(SONGS));
    changeScreen(gameScreen.element.firstElementChild);
    gameScreen.startGame();
  }

  static showResult(model) {
    const resultGame = new ResultScreen(model);
    changeScreen(resultGame.element);
  }

  static showFailTries() {
    const failTries = new ResultFailScreen();
    changeScreen(failTries.element);
  }

  static showFailTime() {
    const timeTries = new ResultFailTimeScreen();
    changeScreen(timeTries.element);
  }
}
