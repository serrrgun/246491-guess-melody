import {changeScreen} from "./utils.js";
import {welcomeScreen} from "./welcome.js";

changeScreen(welcomeScreen);


/*

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const ARROWS_BUTTON = `
    <style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>`;

const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);


const mainElement = document.querySelector(`section.main`);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

let current = 0;

const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

const appBlock = document.querySelector(`.app`);
const fragment = document.createDocumentFragment();
const renderButtons = () => {
  const buttonsBlock = document.createElement(`div`);
  buttonsBlock.className = `arrows__wrap`;
  buttonsBlock.innerHTML = ARROWS_BUTTON;
  fragment.appendChild(buttonsBlock);
};

renderButtons();

appBlock.appendChild(fragment);

select(0);

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

const leftButton = document.querySelector(`.arrows__btn:nth-of-type(1)`);
const rightButton = document.querySelector(`.arrows__btn:nth-of-type(2)`);

leftButton.addEventListener(`click`, () => {
  select(current - 1);
});

rightButton.addEventListener(`click`, () => {
  select(current + 1);
});*/
