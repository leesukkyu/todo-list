// 할 일 목록 컴포넌트

import React from 'react';

import { inject, observer } from 'mobx-react';

import TodoStore from '@Store/stores/Todo/TodoStore';

import TodoUIStore from '@Store/stores/Todo/TodoUIStore';

import classnames from 'classnames';

import IncompleteTodo from '@Components/IncompleteTodo';

import './IncompleteTodoList.scss';

interface IncompleteTodoListProps {
  todoStore?: TodoStore;
  todoUIStore?: TodoUIStore;
  className?: string;
}

function IncompleteTodoList(props: IncompleteTodoListProps) {
  const { todoStore, todoUIStore, className } = props;
  const { incompleteTodoList } = todoStore;
  const { isVisibleCompleteTodoList, filter, search } = todoUIStore;

  // 사용자 필터에 해당되지 않으면 랜더링 하지 않습니다.
  return filter === 'all' || filter === 'incomplete' ? (
    <section
      className={classnames('incomplete-todo-list-comp', {
        [className]: className,
        [filter]: filter,
        active: isVisibleCompleteTodoList,
      })}
    >
      <h2 className="title-text-box">
        <span className="title-text">할 일 목록</span>
      </h2>
      <ul className="incomplete-todo-list">
        {incompleteTodoList.map(todo => {
          // 간략하게 검색 기능을 구현해보았습니다.
          if (todo.content.indexOf(search) !== -1) {
            return <IncompleteTodo key={todo.id} todo={todo} />;
          }
          return false;
        })}
      </ul>
    </section>
  ) : null;
}

export default inject('todoStore', 'todoUIStore')(observer(IncompleteTodoList));
