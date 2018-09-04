import ViewResultSuccess from '../view/view--result-secces';
import screenWelcome from './screen--welcome';
import {changeScreen} from "../utils";

export default (result, points, game) => {
  const screenResultSucces = new ViewResultSuccess(result, points, game);

  screenResultSucces.onClickReplay = () => {
    changeScreen(screenWelcome());
  };

  return screenResultSucces.element;
};
