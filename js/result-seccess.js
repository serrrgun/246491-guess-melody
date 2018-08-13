import {render, changeScreen} from "./utils.js";
import {welcomeScreen} from "./welcome.js";

const template = `

    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов(8 быстрых),совершив 3 ошибки</p>
    <p class="result__text">Вы заняли 2место из 10. Это лучше чему 80% игроков</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>

`;

const templateWrapperClass = `result`;

const gameResultScreen = render(template, templateWrapperClass);

const againButton = gameResultScreen.querySelector(`.result__replay`);

againButton.addEventListener(`click`, () => {
  changeScreen(welcomeScreen);
});

export {gameResultScreen};
