import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';

import Button from '@UI/button';

import './index.scss';

interface ModalProps {
  title: string;
  contents: string;
  onClose: () => void;
  onConfirm: () => void;
}

function Modal(props: ModalProps) {
  const { title, contents, onConfirm, onClose } = props;

  const rootEl = document.getElementById('root');

  const onKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  // DOM 마운트 여부, 키보드 이벤트 리스너 등록 및 해제
  useEffect(() => {
    setIsMounted(true);
    window.addEventListener('keydown', onKeydown);
    return function cleanup() {
      window.removeEventListener('keydown', onKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition in={isMounted} unmountOnExit timeout={330} classNames="fade">
      <div className="modal-comp" onClick={onClose}>
        <div
          className="modal-box"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="title-text">{title}</div>
          <div className="content-text">{contents}</div>
          <div className="btn-box">
            <Button className="btn" title="할 일 삭제하기" onClick={onConfirm}>
              확인
            </Button>
            <Button className="btn ml-2" title="삭제 취소하기" onClick={onClose}>
              취소
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    rootEl,
  );
}

export default Modal;
