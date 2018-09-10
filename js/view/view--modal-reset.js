import View from './view';

export default class ViewModalReset extends View {

  get template() {
    return `
    <section class="modal">
      <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__buttons">
        <button class="modal__button button">Ок</button>
        <button class="modal__button button">Отмена</button>
      </div>
    </section>`;
  }

  bind() {
    const closeButtonCross = this.element.querySelector(`.modal__close`);
    const closeButtonCancel = this.element.querySelector(`.modal__button:last-child`);
    const closeButtonConfirm = this.element.querySelector(`.modal__button:first-child`);

    const cancelHandler = (evt) => {
      evt.preventDefault();
      this.onCancel();
    };

    closeButtonCancel.addEventListener(`click`, cancelHandler);
    closeButtonCross.addEventListener(`click`, cancelHandler);

    closeButtonConfirm.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onConfirm();
    });
  }

  onCancel() {

  }

  onConfirm() {

  }

}
