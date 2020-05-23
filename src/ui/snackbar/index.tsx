import { Snackbar as ISnackbar } from '@Types/Snackbar';

import React from 'react';

import { CSSTransition } from 'react-transition-group';

import classnames from 'classnames';

import './index.scss';

function Snackbar(props: ISnackbar) {
  const { isOpen, msg, type } = props;
  return (
    <div
      className={classnames('comp-snackbar', {
        [type]: type,
      })}
    >
      <CSSTransition in={isOpen} unmountOnExit timeout={220} classNames="scale">
        <div className="snackbar-wrap">
          <div className="snackbar-box">{msg}</div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Snackbar;
