// 할 일 UI 데이터 스토어

import { observable, action, configure, runInAction, reaction } from 'mobx';

import TodoRepository from './TodoRepository';

configure({ enforceActions: 'observed' });

type IFilter = 'all' | 'complete' | 'incomplete';

class TodoUIStore {
  @observable
  isVisibleCompleteTodoList = false; // 사용자 완료 목록 열기 여부

  @observable
  filter: IFilter = 'all'; // 필터

  @observable
  search = ''; // 검색어

  constructor() {
    this.loadIsVisibleCompleteTodoList(); // 저장된 완료 목록 열기 여부를 불러온다.
    // 완료 목록 열기 상태가 변하면 자동 저장한다.
    reaction(
      () => this.isVisibleCompleteTodoList,
      () => this.saveIsVisibleCompleteTodoList(),
    );
  }

  // '완료 목록 보기 여부' 토글
  @action.bound
  toggleVisibleCompleteTodoList() {
    this.isVisibleCompleteTodoList = !this.isVisibleCompleteTodoList;
  }

  // '필터' set
  @action.bound setFilter(filter: IFilter) {
    this.filter = filter;
  }

  // '검색어' set
  @action.bound setSearch(search: string) {
    this.search = search;
  }

  // '완료 목록 열기 여부' 불러오기
  @action
  async loadIsVisibleCompleteTodoList() {
    const previousIsVisibleCompleteTodoList: boolean = await TodoRepository.loadIsVisibleCompleteTodoList();
    runInAction(() => {
      this.isVisibleCompleteTodoList = previousIsVisibleCompleteTodoList;
    });
  }

  // '완료 목록 열기 여부' 저장하기
  @action
  async saveIsVisibleCompleteTodoList() {
    await TodoRepository.saveIsVisibleCompleteTodoList(this.isVisibleCompleteTodoList);
  }
}

export default TodoUIStore;
