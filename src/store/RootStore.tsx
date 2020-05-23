// 루트 스토어

import SnackbarStore from '@Store/stores/Snackbar/SnackbarStore';

import TodoStore from '@Store/stores/Todo/TodoStore';

import TodoUIStore from '@Store/stores/Todo/TodoUIStore';

import TestStore from '@Store/stores/TestStore';

import { configure } from 'mobx';

configure({ enforceActions: 'observed' });

class RootStore {
  snackbarStore: SnackbarStore;

  todoStore: TodoStore;

  todoUIStore: TodoUIStore;

  testStore: TestStore;

  constructor() {
    this.snackbarStore = new SnackbarStore();
    this.todoStore = new TodoStore(this.snackbarStore);
    this.todoUIStore = new TodoUIStore();
    this.testStore = new TestStore();
  }
}

// 싱글톤으로 내보내기
export default new RootStore();
