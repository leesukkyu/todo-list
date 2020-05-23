// 스낵바 관리 컴포넌트

import React from 'react';

import { inject, observer } from 'mobx-react';

import SnackbarStore from '@Stores/Snackbar/SnackbarStore';

import { Snackbar as SnackbarUI } from '@UI/index';

interface SnackbarProps {
  snackbarStore?: SnackbarStore;
}

function Snackbar(props: SnackbarProps) {
  const { snackbarStore } = props;
  return (
    <SnackbarUI isOpen={snackbarStore.isOpen} msg={snackbarStore.msg} type={snackbarStore.type} />
  );
}

export default inject('snackbarStore')(observer(Snackbar));
