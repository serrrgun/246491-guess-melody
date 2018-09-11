import GameModel from './data/game-model';
import GameScreen from './controllers/screen--game';
import WelcomeScreen from './controllers/screen--welcome';
import ResultFailScreen from './controllers/screen--result-fail_tries';
import ResultFailTimeScreen from './controllers/screen--result-fail_time';
import ResultScreen from './controllers/screen--result-secces';
import {changeScreen} from './utils';
import SplashScreen from './view/view-splash';
import ViewError from './view/view--modal-error';


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const GET_URL = `https://es.dump.academy/guess-melody/questions`;
let questData;

export default class Router {

  static start() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    fetch(GET_URL).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => {
        questData = data;
        return questData;
      }).
      then(Router.showWelcome).
      catch(Router.showError).
      then(() => splash.stop());
  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(questData));
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

  static showError(error) {
    const errorView = new ViewError(error);
    errorView.showModal();
  }
}
