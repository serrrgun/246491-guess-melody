import ViewWelcome from '../view/view--welcome';
import Router from '../router';

export default class WelcomeScreen {
  constructor() {
    this.screen = new ViewWelcome();
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onPlayClick = () => Router.showGame();
  }
}
