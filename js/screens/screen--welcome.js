import ViewWelcome from '../view/view--welcome';
import {startGame} from '../screens/screen--game';

export default () => {
  const screenWelcome = new ViewWelcome();

  screenWelcome.onPlayClick = () => {
    startGame();
  };

  return screenWelcome.element;
};
