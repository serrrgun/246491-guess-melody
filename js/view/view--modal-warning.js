import View from './view';

export default class ViewModalWarning extends View {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal modal--hidden">
      <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__buttons">
        <button class="modal__button button">Ок</button>
        <button class="modal__button button">Отмена</button>
      </div>
    </section>`;
  }

  bind () {
    const closeButtonCansel = this.element.querySelector(`.modal__button:first-child`);
    const closeButtonCross = this.element.querySelector(`.modal__close`);
    const closeButtonConfirm = this.element.querySelector(`.modal__button:last-child`);

    const canselHandler = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onCancel();
    };

    closeButtonCansel.addEventListener(`click`, canselHandler);
    closeButtonCross.addEventListener(`click`, canselHandler);

    closeButtonConfirm.addEventListener(`click`, this.onConfirm);
  }

  onCancel() {

  }

  onConfirm() {

  }

}
