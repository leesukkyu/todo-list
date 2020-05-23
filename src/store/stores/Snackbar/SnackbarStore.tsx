// 스낵바 스토어

import { observable, action, configure, runInAction } from 'mobx';

import { Snackbar as ISnackbar } from '@Types/Snackbar';

configure({ enforceActions: 'observed' });

const CLOSE_TIME = 2000;

class SnackbarStore implements ISnackbar {
  @observable
  isOpen = false; // 스낵바 오픈 여부

  @observable
  msg = ''; // 스낵바 메세지

  @observable
  type: 'positive' | 'negative' = 'positive'; // 스낵바 타입

  timeoutId: number = null; // 스낵바 자동 종료용 타이머

  // 스낵바 열기 // 'CLOSE_TIME' 지나면 자동으로 닫히고 도중에 중첩되어 열리면 새로운 CLOSE_TIME 후에 닫힌다.
  @action
  async openSnackbar(payload: ISnackbar) {
    this.isOpen = true;
    this.msg = payload.msg;
    this.type = payload.type || 'positive';

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      runInAction(() => {
        this.isOpen = false;
      });
    }, CLOSE_TIME);
  }
}

export default SnackbarStore;
