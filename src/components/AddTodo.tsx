// 할 일 추가하기 컴포넌트

import React from 'react';

import moment from 'moment';

import { v4 as uuidv4 } from 'uuid';

import { inject } from 'mobx-react';

import TodoStore from '@Store/stores/Todo/TodoStore';

import { Textarea, Button } from '@UI/index';

import './AddTodo.scss';

interface AddTodoProps {
  todoStore?: TodoStore;
}

interface AddTodoState {
  todoContent: string;
}

@inject('todoStore')
class AddTodo extends React.Component<AddTodoProps, AddTodoState> {
  constructor(props: AddTodoProps) {
    super(props);
    this.state = {
      todoContent: '',
    };
  }

  onSubmitTodoAddBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { todoContent } = this.state;
    const { todoStore } = this.props;
    if (todoContent) {
      todoStore.addTodo({
        id: uuidv4(),
        content: todoContent,
        isComplete: false,
        createdTimestamp: moment().valueOf(),
      });
      this.setState({
        todoContent: '',
      });
    }
  };

  render() {
    const { todoContent } = this.state;
    return (
      <form className="add-todo-comp" onSubmit={this.onSubmitTodoAddBtn}>
        <div className="textarea-box">
          <Textarea
            placeholder="할 일을 입력하세요"
            value={todoContent}
            onChange={e => {
              this.setState({
                todoContent: e.currentTarget.value,
              });
            }}
          />
        </div>
        <div className="submit-btn-box">
          <Button
            type="submit"
            title="저장하기"
            className="submit-btn btn-animation"
            disabled={!todoContent}
          >
            할 일 추가하기
          </Button>
        </div>
      </form>
    );
  }
}

export default AddTodo;
