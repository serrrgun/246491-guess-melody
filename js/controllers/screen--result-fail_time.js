import ViewResultFailTime from '../view/view--result-fail_time';
import Router from '../router';

export default class ResultFailTimeScreen {
  constructor() {
    this.screen = new ViewResultFailTime();
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onClickReplay = () => Router.showGame();
  }
}
