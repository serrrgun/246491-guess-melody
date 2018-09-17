import GameModel from './data/game-model';
import GameScreen from './controllers/screen--game';
import {changeScreen} from './utils';
import ViewSplash from './view/view-splash';
import ViewError from './view/view--modal-error';
import Loader from './loader';
import ViewResultFailTime from "./view/view--result-fail_time";
import ViewWelcome from "./view/view--welcome";
import ViewResultFail from "./view/view--result-fail_tries";
import ViewResultSuccess from "./view/view--result-secces";

let questData;

export default class Router {

  static start() {
    const splash = new ViewSplash();
    changeScreen(splash.element);

    Loader.loadData().
      then((data) => {
        questData = data;
      }).
      then(Router.showWelcome).
      catch(Router.showError);
  }

  static showWelcome() {
    const welcomeScreen = new ViewWelcome();
    changeScreen(welcomeScreen.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(questData));
    changeScreen(gameScreen.element.firstElementChild);
    gameScreen.startGame();
  }

  static showResult(model) {
    const splash = new ViewSplash();
    changeScreen(splash.element);
    Loader.saveResults(model.dataGame)
      .then(() => Loader.loadResults())
      .then((data) => changeScreen(new ViewResultSuccess(model.getEndGame(data)).element))
      .catch(Router.showError);
  }

  static showFailTries() {
    const failTries = new ViewResultFail();
    changeScreen(failTries.element);
  }

  static showFailTime() {
    const timeTries = new ViewResultFailTime();
    changeScreen(timeTries.element);
  }

  static showError(error) {
    const errorView = new ViewError(error);
    errorView.showModal();
  }
}
