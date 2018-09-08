import ViewResultFail from '../view/view--result-fail_tries';
import Router from '../router';


export default class ResultFailScreen {
  constructor() {
    this.screen = new ViewResultFail();
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onClickReplay = () => Router.showWelcome();
  }
}
