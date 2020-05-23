import { observable, action, configure, computed, runInAction, reaction } from 'mobx';

configure({ enforceActions: 'observed' });

class TestStore {
  @observable
  test = 10;

  @action
  setTest(value: number) {
    this.test = value;
  }
}

export default TestStore;
