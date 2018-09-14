import GameModel from './data/game-model';
import GameScreen from './controllers/screen--game';
import WelcomeScreen from './controllers/screen--welcome';
import ResultFailScreen from './controllers/screen--result-fail_tries';
import ResultFailTimeScreen from './controllers/screen--result-fail_time';
import ResultScreen from './controllers/screen--result-secces';
import {changeScreen} from './utils';
import SplashScreen from './view/view-splash';
import ViewError from './view/view--modal-error';
import Loader from './loader';

let questData;

export default class Router {

  static start() {
    const splash = new SplashScreen();
    changeScreen(splash.element);

    Loader.loadData().
      then((data) => {
        questData = data;
      }).
      then(Router.showWelcome).
      catch(Router.showError);
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
    const splash = new SplashScreen();
    changeScreen(splash.element);
    Loader.saveResults(model.dataGame)
      .then(() => Loader.loadResults())
      .then((data) => changeScreen(new ResultScreen(model.getEndGame(data)).element))
      .catch(Router.showError);
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
