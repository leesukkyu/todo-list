// 목록 컴포넌트

import React from 'react';

import CompleteTodoList from '@Components/CompleteTodoList';

import IncompleteTodoList from '@Components/IncompleteTodoList';

import './TodoList.scss';

function TodoList() {
  return (
    <div className="todo-list-comp">
      <IncompleteTodoList className="todo-list-section" />
      <CompleteTodoList className="todo-list-section" />
    </div>
  );
}

export default TodoList;
