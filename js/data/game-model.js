import {FULL_TIME, INITIAL_GAME} from './game-data';
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

  get gameUser() {
    return this._game;
  }

  get dataGame() {
    return {
      time: FULL_TIME - this._state.time,
      score: this.gameUser.score,
    };
  }

  get levelGame() {
    return this.data[this._state.level];
  }

  set gameUser(user) {
    this._game = user;
  }

  getEndGame(data) {
    const statistic = data.map((it) => it.score);
    return {
      score: this.gameUser.score,
      time: FULL_TIME - this._state.time,
      lives: this._state.lives,
      text: showResult(statistic, this.gameUser)
    };
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

