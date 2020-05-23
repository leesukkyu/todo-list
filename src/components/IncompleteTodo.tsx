// 할 일 컴포넌트

import { Todo as ITodo } from '@Types/Todo';

import React from 'react';

import moment from 'moment';

import Button from '@UI/button';

import './IncompleteTodo.scss';

interface IncompleteTodoProps {
  todo: ITodo;
}

function IncompleteTodo({ todo }: IncompleteTodoProps) {
  return (
    <li className="incomplete-todo-comp mb-3">
      <div className="content-box">{todo.content}</div>
      <div className="time-box pl-3">
        {moment(todo.createdTimestamp).format('YYYY.MM.DD HH:mm')}
      </div>
      <div className="status-btn-box pl-3">
        <Button
          type="button"
          className="status-btn"
          title="완료 처리하기"
          icon="true"
          onClick={() => {
            todo.toggleIsComplete();
          }}
        >
          <i className="material-icons vm small">done</i>
        </Button>
      </div>
    </li>
  );
}

export default IncompleteTodo;
