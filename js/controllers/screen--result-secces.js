import ViewResultSuccess from '../view/view--result-secces';
import Router from "../router";


export default class ResultScreen {
  constructor(model) {
    this.screen = new ViewResultSuccess(model);
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onClickReplay = () => Router.showWelcome();
  }
}
