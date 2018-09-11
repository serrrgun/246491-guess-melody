import AbstractView from './view';

export default class ViewError extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
    <section class="modal">
    <h2 class="modal__title">Произошла ошибка!</h2>
    <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
  </section>`;
  }

  showModal() {
    document.body.appendChild(this.element);
  }

  bind() {
    const removeErrorMessageHandler = () => {
      document.body.removeChild(this.element);
      this.element.removeEventListener(`click`, removeErrorMessageHandler);
    };

    this.element.addEventListener(`click`, removeErrorMessageHandler);
  }
}
