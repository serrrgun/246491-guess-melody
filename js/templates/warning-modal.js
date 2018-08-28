import {render} from "../utils.js";

const template = `
<section class="modal modal--hidden">
  <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
  <h2 class="modal__title">Подтверждение</h2>
  <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
  <div class="modal__buttons">
    <button class="modal__button button">Ок</button>
    <button class="modal__button button">Отмена</button>
  </div>
</section>`;

const modalWarning = render(template);

const closeModal = (evt) => {
  evt.preventDefault();
  modalWarning.classList.add(`modal--hidden`);
};

modalWarning.querySelector(`.modal__button:last-child`).addEventListener(`click`, closeModal);
modalWarning.querySelector(`.modal__close`).addEventListener(`click`, closeModal);

export {modalWarning};
