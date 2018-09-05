import ViewResultFail from '../view/view--result-fail';
import {startGame} from "../screens/screen--game";

export default () => {
  const screenResultFail = new ViewResultFail();

  screenResultFail.onClickReplay = () => {
    startGame();
  };

  return screenResultFail.element;
};
