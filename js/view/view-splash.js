import AbstractView from './view';

export default class ViewSplash extends AbstractView {

  get template() {
    return `
     <div class="load">
       <div>G</div>
       <div>N</div>
       <div>I</div>
       <div>D</div>
       <div>A</div>
       <div>O</div>
       <div>L</div>
     </div>
    `;
  }

  bind() {}
}
