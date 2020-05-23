// 할 일 데이터 스토어

import SnackbarStore from '@Stores/Snackbar/SnackbarStore';

import { Todo as ITodo } from '@Types/Todo';

import { observable, action, configure, computed, runInAction, reaction } from 'mobx';

import TodoModel from './TodoModel';

import TodoRepository from './TodoRepository';

configure({ enforceActions: 'observed' });

class TodoStore {
  @observable
  todoList: ITodo[] = []; // 할 일 리스트

  snackbarStore: SnackbarStore; // 스낵바 스토어

  constructor(snackbarStore: SnackbarStore) {
    this.snackbarStore = snackbarStore;

    this.loadTodoList(); // 저장된 할 일 리스트를 불러온다.

    // 할 일이 변화한 시점(생성, 삭제, 완료)에 자동 저장한다.
    reaction(
      () => this.todoList.map(todo => todo.isComplete),
      () => this.saveTodoList(),
    );
  }

  // 완료된 일 목록
  @computed get completeTodoList() {
    return this.todoList.filter(todo => todo.isComplete);
  }

  // 할 일 목록
  @computed get incompleteTodoList() {
    return this.todoList.filter(todo => !todo.isComplete);
  }

  // 할 일 추가하기
  @action
  addTodo(todo: ITodo) {
    this.todoList.push(new TodoModel(todo, this.snackbarStore));
    this.snackbarStore.openSnackbar({
      msg: '할 일이 추가되었습니다.',
    });
  }

  // 할 일 삭제하기
  @action
  removeTodo(todo: ITodo) {
    const index = this.todoList.indexOf(todo);
    this.todoList.splice(index, 1);
    this.snackbarStore.openSnackbar({
      msg: '할 일이 삭제되었습니다.',
      type: 'negative',
    });
  }

  // '할 일 목록' 불러오기
  @action
  async loadTodoList() {
    const { snackbarStore } = this;
    try {
      snackbarStore.openSnackbar({
        msg: '저장된 할 일 목록을 불러옵니다.',
      });
      const previousTodoList: ITodo[] = await TodoRepository.loadTodoList();
      runInAction(() => {
        this.todoList = previousTodoList.map(todo => new TodoModel(todo, snackbarStore));
      });
      if (Array.isArray(previousTodoList) && previousTodoList.length) {
        snackbarStore.openSnackbar({
          msg: '저장된 할 일 목록을 불러왔습니다.',
        });
      } else {
        snackbarStore.openSnackbar({
          msg: '저장된 할 일 목록이 없습니다.',
          type: 'negative',
        });
      }
    } catch (error) {
      snackbarStore.openSnackbar({
        msg: '이전 목록 불러오기 과정에서 오류가 발생했습니다.',
        type: 'negative',
      });
    }
  }

  // '할 일 목록' 저장하기
  @action
  async saveTodoList() {
    try {
      await TodoRepository.saveTodoList(this.todoList);
    } catch (error) {
      this.snackbarStore.openSnackbar({
        msg: '저장 과정에서 오류가 발생했습니다.',
        type: 'negative',
      });
    }
  }
}

export default TodoStore;
