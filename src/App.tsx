import React from 'react';

import Header from '@Components/Header';

import AddTodo from '@Components/AddTodo';

import FilterBox from '@Components/FilterBox';

import TodoList from '@Components/TodoList';

import Snackbar from '@Components/Snackbar';

import './App.scss';

function App() {
  return (
    <div className="app-wrap">
      <Header />
      <AddTodo />
      <FilterBox />
      <TodoList />
      <Snackbar />
    </div>
  );
}

export default App;
