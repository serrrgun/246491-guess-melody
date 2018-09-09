import ViewModalReset from '../view/view--modal-reset';
import Router from "../router";

export default class ResetModalScreen {
  constructor() {
    this.screen = new ViewModalReset();
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onCancel = () => this.element.classList.add(`modal--hidden`);

    this.screen.onConfirm = () => {
      this.element.firstElementChild.classList.add(`modal--hidden`);
      Router.showWelcome();
    };
  }
}
