export default class AbstractView {
  get template() {}

  render() {
    const container = document.createElement(`template`);
    container.innerHTML = this.template;
    return container.content;
  }

  bind() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
