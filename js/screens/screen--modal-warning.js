import ViewModalWarning from '../view/view--modal-warning';
import {changeScreen} from "../utils";
import welcomeScreen from "./screen--welcome";
import {resetGame} from '../screens/screen--game';

export default () => {

  const modalWarning = new ViewModalWarning();

  modalWarning.onCancel = () => {
    modalWarning.element.classList.add(`modal--hidden`);
  };

  modalWarning.onConfirm = () => {
    modalWarning.element.firstElementChild.classList.add(`modal--hidden`);
    resetGame();
    changeScreen(welcomeScreen());
  };

  return modalWarning.element;
};
