// 할 일 레포지토리 클래스 // 저장 장소 변경 시 해당 레이어만 수정하면 됩니다.

import { action, toJS, configure } from 'mobx';

import { Todo as ITodo } from '@Types/Todo';

import { AES, enc } from 'crypto-js';

import { KEY } from '@Src/ini';

configure({ enforceActions: 'observed' });

class TodoRepository {
  // 할 일 리스트 가져오기
  @action
  loadTodoList(): Promise<ITodo[]> {
    return new Promise(resolve => {
      const ciphertext = localStorage.getItem('todoList');
      if (ciphertext) {
        const bytes = AES.decrypt(ciphertext, KEY);
        const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
        resolve(decryptedData);
      } else {
        resolve([]);
      }
    });
  }

  // 할 일 리스트 저장하기
  @action
  saveTodoList(todoList: ITodo[]) {
    const data = toJS(todoList);
    const ciphertext = AES.encrypt(JSON.stringify(data), KEY).toString();
    return new Promise(resolve => {
      localStorage.setItem('todoList', ciphertext);
      resolve();
    });
  }

  // '완료된 할 일 목록 보기' 불러오기
  @action
  loadIsVisibleCompleteTodoList(): Promise<boolean> {
    return new Promise(resolve => {
      const data = JSON.parse(localStorage.getItem('isVisibleCompleteTodoList'));
      resolve(!!data);
    });
  }

  // '완료된 할 일 목록 보기' 저장하기
  @action
  saveIsVisibleCompleteTodoList(isVisibleCompleteTodoList: boolean) {
    return new Promise(resolve => {
      localStorage.setItem('isVisibleCompleteTodoList', JSON.stringify(isVisibleCompleteTodoList));
      resolve();
    });
  }
}

// 싱글톤
export default new TodoRepository();
