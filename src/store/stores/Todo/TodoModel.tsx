// 할 일 모델 클래스

import { Todo as ITodo } from '@Types/Todo';

import { set, action, observable, configure } from 'mobx';

import SnackbarStore from '@Stores/Snackbar/SnackbarStore';

configure({ enforceActions: 'observed' });

class TodoModel implements ITodo {
  @observable
  isComplete = false;

  id: string;

  content: string;

  createdTimestamp: number;

  snackbarStore: SnackbarStore;

  constructor(data: ITodo, snackbarStore: SnackbarStore) {
    set(this, data);
    this.snackbarStore = snackbarStore;
  }

  // 완료 여부 토글하기
  @action
  toggleIsComplete() {
    this.isComplete = !this.isComplete;
    this.snackbarStore.openSnackbar({
      msg: this.isComplete ? '완료 목록으로 이동되었습니다.' : '할 일 목록으로 이동되었습니다.',
    });
  }
}

export default TodoModel;
