import ViewHeader from '../view/view--header';
import ViewLevelArtist from '../view/view--level-artist';
import ViewLevelGenre from '../view/view--level-genre';
import ViewModalReset from '../view/view--modal-reset';
import Router from '../router';
import {user, SECOND} from '../data/game-data';
import {calculatePoints} from '../bisness-logic/calculate-points';
import {mainElement} from '../utils';



export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.init();
    this.bind();
  }

  init() {
    this.header = new ViewHeader(this.model.state);
    this.modal = new ViewModalReset();
    this.levelType(this.model.levelGame);
    this.mainElement = mainElement;
    this.second = SECOND;
    this.root = document.createElement(`div`);
    this.root.appendChild(this.level.element);
    this.level.element.insertBefore(this.header.element, this.level.element.firstElementChild);
  }

  get element() {
    return this.root;
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.model.tick();
      this.updateHeader();
      this.startTimer();
    }, this.second);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  startGame() {
    this.restart();
    this.changeLevel(this.level);
    this.startTimer();
  }

  restart() {
    this.model.restart();
    user.clear();
  }

  showModal() {
    this.modal.showModal();
    this.modal.onConfirm = () => {
      this.stopTimer();
      Router.start();
      this.modal.closeModal();
    };
    this.modal.onCancel = () => {
      this.modal.closeModal();
      this.startTimer();
    };
  }

  bind() {
    this.header.restartGame = () => {
      this.showModal();
      this.stopTimer();
    };
  }

  updateHeader() {
    this.header = new ViewHeader(this.model.state);
    this.level.element.replaceChild(this.header.element, this.level.element.firstElementChild);
    this.header.element.restartGame = this.bind();
  }

  levelType(level) {
    switch (level.type) {
      case `genre`:
        this.level = new ViewLevelGenre(level);
        break;
      case `artist`:
        this.level = new ViewLevelArtist(level);
        break;
    }
  }

  changeLevel(level) {
    level.onAnswerClick = this.answerLevel.bind(this);
    this.changeLevelContent(level);
  }

  changeLevelContent(view) {
    view.element.insertBefore(this.header.element, view.element.firstElementChild);
    this.mainElement.replaceChild(view.element, this.mainElement.firstElementChild);
  }

  validateLevel() {
    if (this.model.hasNextLevel()) {
      this.model.nextLevel();
      this.levelType(this.model.levelGame);
      this.changeLevel(this.level);
      this.startTimer();
    } else {
      this.model.result = {
        score: calculatePoints([...user], this.model.state.lives),
        lives: this.model.state.lives,
        time: this.model.state.time,
      };
      Router.showResult(this.model);
    }
  }

  answerLevel(answer) {
    this.stopTimer();
    if (answer) {
      user.add({result: true, time: this.model.state.time});
    } else {
      try {
        this.model.die();
        user.add({result: false, time: this.model.state.time});
      } catch (e) {
        Router.showFailTries();
        return;
      }
    }
    this.validateLevel();
  }
}
