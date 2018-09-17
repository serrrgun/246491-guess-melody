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
    this._levelType(this.model.levelGame);
    this.mainElement = mainElement;
    this.second = SECOND;
    this.root = document.createElement(`div`);
    this.root.appendChild(this.level.element);
    this.level.element.insertBefore(this.header.element, this.level.element.firstElementChild);
  }

  get element() {
    return this.root;
  }

  _startTimer() {
    this.timer = setTimeout(() => {
      this.model.tick();
      this._updateHeader();
      this._startTimer();
    }, this.second);
  }

  _stopTimer() {
    clearTimeout(this.timer);
  }

  startGame() {
    this._restart();
    this._changeLevel(this.level);
    this._startTimer();
  }

  _restart() {
    this.model.restart();
    user.clear();
  }

  _showModal() {
    this.modal.showModal();
    this.modal.onConfirm = () => {
      this.stopTimer();
      Router.start();
      this.modal.closeModal();
    };
    this.modal.onCancel = () => {
      this.modal.closeModal();
      this._startTimer();
    };
  }

  bind() {
    this.header.restartGame = () => {
      this._showModal();
      this._stopTimer();
    };
  }

  _updateHeader() {
    this.header = new ViewHeader(this.model.state);
    this.level.element.replaceChild(this.header.element, this.level.element.firstElementChild);
    this.header.element.restartGame = this.bind();
  }

  _levelType(level) {
    switch (level.type) {
      case `genre`:
        this.level = new ViewLevelGenre(level);
        break;
      case `artist`:
        this.level = new ViewLevelArtist(level);
        break;
    }
  }

  _changeLevel(level) {
    level.onAnswerClick = this.answerLevel.bind(this);
    this._changeLevelContent(level);
  }

  _changeLevelContent(view) {
    view.element.insertBefore(this.header.element, view.element.firstElementChild);
    this.mainElement.replaceChild(view.element, this.mainElement.firstElementChild);
  }

  _validateLevel() {
    if (this.model.hasNextLevel()) {
      this.model.nextLevel();
      this._levelType(this.model.levelGame);
      this._changeLevel(this.level);
      this._startTimer();
    } else {
      this.model.gameUser = {
        score: calculatePoints([...user], this.model.state.lives),
        lives: this.model.state.lives,
        time: this.model.state.time,
      };
      Router.showResult(this.model);
    }
  }

  answerLevel(answer) {
    this._stopTimer();
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
    this._validateLevel();
  }
}
