// 완료 목록 컴포넌트

import React from 'react';

import { inject, observer } from 'mobx-react';

import TodoStore from '@Store/stores/Todo/TodoStore';

import TodoUIStore from '@Store/stores/Todo/TodoUIStore';

import CompleteTodo from '@Components/CompleteTodo';

import { CSSTransition } from 'react-transition-group';

import classnames from 'classnames';

import './CompleteTodoList.scss';

interface CompleteTodoListProps {
  todoStore?: TodoStore;
  todoUIStore?: TodoUIStore;
  className?: string;
}

function CompleteTodoList(props: CompleteTodoListProps) {
  const { todoStore, todoUIStore, className } = props;
  const { completeTodoList } = todoStore;
  const { isVisibleCompleteTodoList, filter, search } = todoUIStore;

  // 사용자 필터에 해당되지 않으면 랜더링 하지 않습니다.
  return filter === 'all' || filter === 'complete' ? (
    <CSSTransition in={isVisibleCompleteTodoList} timeout={230} classNames="animation">
      <section
        className={classnames('complete-todo-list-comp', {
          [className]: className,
          [filter]: filter,
          active: isVisibleCompleteTodoList,
        })}
      >
        <h2 className="title-text-box">
          <span className="title-text">완료 목록</span>
        </h2>
        <div className="open-complete-list-btn-box">
          <button
            type="button"
            className="open-complete-list-btn"
            title="완료 목록 열기"
            onClick={todoUIStore.toggleVisibleCompleteTodoList}
          >
            <i className="material-icons large vm">playlist_add_check</i>
            <span className="vm ml-1">
              {isVisibleCompleteTodoList ? '완료 목록 닫기' : '완료 목록 열기'}
            </span>
          </button>
        </div>
        <ul className="complete-todo-list">
          {completeTodoList.map(todo => {
            // 간략하게 검색 기능을 구현해보았습니다.
            if (todo.content.indexOf(search) !== -1) {
              return <CompleteTodo key={todo.id} todo={todo} />;
            }
            return false;
          })}
        </ul>
      </section>
    </CSSTransition>
  ) : null;
}

export default inject('todoStore', 'todoUIStore')(observer(CompleteTodoList));
