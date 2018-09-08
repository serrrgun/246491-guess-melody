import {INITIAL_GAME, statistic} from './game-data';
import {changeLevel} from '../bisness-logic/level-selection';
import {showResult} from '../bisness-logic/show-user-result';
import {reductionLives} from '../bisness-logic/reduction-lives';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.restart();
  }

  get state() {
    return this._state;
  }

  get result() {
    return this._showResalt;
  }

  get scoring() {
    return this._showResalt.score;
  }

  set result(user) {
    this._showResalt = user;
  }

  get endGame() {
    return showResult(statistic, this.result);
  }

  get levelGame() {
    return this.data[this._state.level];
  }

  restart() {
    this._state = Object.assign({}, INITIAL_GAME);
  }

  hasNextLevel() {
    return this.data[this._state.level + 1] !== void 0;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  die() {
    this._state = reductionLives(this._state);
  }

  tick() {
    this._state = Object.assign({}, this.state, {time: this._state.time - 1});
  }
}

