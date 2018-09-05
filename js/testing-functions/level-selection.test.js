import {assert} from 'chai';
import {changeLevel} from './level-selection';

describe(`Managing player levels`, () => {
  it(`Should subtract level.`, () => {
    assert.deepEqual(changeLevel({level: 6}), {level: 7});
  });
  it(`Should to report if levels ended.`, () => {
    assert.throws(() => changeLevel({level: 12, lives: 1, time: 30}), `End Levels`);
  });
});
