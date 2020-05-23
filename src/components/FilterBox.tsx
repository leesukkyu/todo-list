// 필터 컴포넌트

import React from 'react';

import { inject, observer } from 'mobx-react';

import TodoUIStore from '@Store/stores/Todo/TodoUIStore';

import debounce from 'lodash.debounce';

import classnames from 'classnames';

import { Button, Input } from '@UI/index';

import allFilterImg from '@Images/allFilter.png';
import completeFilterImg from '@Images/completeFilter.png';
import incompleteFilterImg from '@Images/incompleteFilter.png';

import './FilterBox.scss';

interface FilterBoxProps {
  todoUIStore?: TodoUIStore;
}

interface FilterBoxState {
  search: string;
}

@inject('todoUIStore')
@observer
class FilterBox extends React.Component<FilterBoxProps, FilterBoxState> {
  debounceSetSearchTodoStore: (search: string) => void;

  constructor(props: FilterBoxProps) {
    super(props);
    this.state = {
      search: '',
    };
    // 검색기능 debounce 처리
    this.debounceSetSearchTodoStore = debounce(this.setSearchToStore, 500);
  }

  setSearchToStore = (search: string) => {
    const { todoUIStore } = this.props;
    todoUIStore.setSearch(search);
  };

  render() {
    const { todoUIStore } = this.props;
    const { filter, setFilter } = todoUIStore;
    const { search } = this.state;

    return (
      <div className="filterbox-comp">
        <div className="filterbox-comp-box">
          <div className="search-box">
            <Input
              placeholder="검색어를 입력하세요."
              value={search}
              onChange={e => {
                this.setState({
                  search: e.currentTarget.value,
                });
                this.debounceSetSearchTodoStore(e.currentTarget.value);
              }}
            />
          </div>
          <ul className="filter-list">
            <li
              className={classnames('filter-item', {
                active: filter === 'all',
              })}
            >
              <Button
                title="모두보기"
                className="filter-btn"
                style={{ backgroundImage: `url(${allFilterImg})` }}
                onClick={() => {
                  setFilter('all');
                }}
              />
            </li>
            <li
              className={classnames('filter-item', {
                active: filter === 'incomplete',
              })}
            >
              <Button
                title="할 일만 보기"
                className="filter-btn"
                style={{ backgroundImage: `url(${incompleteFilterImg})` }}
                onClick={() => {
                  todoUIStore.setFilter('incomplete');
                }}
              />
            </li>
            <li
              className={classnames('filter-item', {
                active: filter === 'complete',
              })}
            >
              <Button
                title="완료된 할 일만 보기"
                className="filter-btn"
                style={{ backgroundImage: `url(${completeFilterImg})` }}
                onClick={() => {
                  todoUIStore.setFilter('complete');
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterBox;
