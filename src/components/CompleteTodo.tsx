// 완료된 일 컴포넌트

import React, { useState } from 'react';

import moment from 'moment';

import { inject, observer } from 'mobx-react';

import TodoStore from '@Store/stores/Todo/TodoStore';

import { Todo as ITodo } from '@Types/Todo';

import {Button, Modal} from '@UI/index';

import './CompleteTodo.scss';

interface CompleteTodoProps {
  todoStore?: TodoStore;
  todo: ITodo;
}

function CompleteTodo({ todo, todoStore }: CompleteTodoProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <li className="complete-todo-comp mb-3">
      <div className="content-box">{todo.content}</div>
      <div className="time-box pl-3">
        {moment(todo.createdTimestamp).format('YYYY.MM.DD HH:mm')}
      </div>
      <div className="status-btn-box pl-3">
        <Button
          className="status-btn"
          title="미완료 처리하기"
          icon="true"
          onClick={() => {
            todo.toggleIsComplete();
          }}
        >
          <i className="material-icons vm small">replay</i>
        </Button>
      </div>
      <div className="delete-btn-box pl-3">
        <Button
          className="delete-btn"
          title="삭제하기"
          icon="true"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          <i className="material-icons vm small">delete</i>
        </Button>
      </div>
      {isOpenModal ? (
        <Modal
          title="정말 삭제하시겠습니까?"
          contents="할 일을 삭제하면 되돌릴 수 없습니다."
          onConfirm={() => {
            todoStore.removeTodo(todo);
            setIsOpenModal(false);
          }}
          onClose={() => {
            setIsOpenModal(false);
          }}
        />
      ) : null}
    </li>
  );
}

export default inject('todoStore')(observer(CompleteTodo));
