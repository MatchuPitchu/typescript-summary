import React, { useState } from 'react';
// react-router-dom (don't needed in this project here) has first of all no type support;
// solution: add npm i --save-dev @types/react-router-dom to gain type support and autocompletion inside Visual Studio Code
// import { Router } from 'react-router-dom';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import Todo from './todo.model'

// use React.FC type for component
const App: React.FC = () => {
  // use Generic function to define structure of the state, 
  // because in the beginning state is set to empty array, so TS doesn't know what's intended to be inside
  const [todos, setTodos ]= useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos(prev => [
      ...prev,
      { id: Math.random().toString(), text }
    ])
  }

  const todoDeleteHandler = (todoId: string) => {
    setTodos(prev => {
      // adds item to returned array if function evaluates to true
      return prev.filter(todo => todo.id !== todoId)
    })
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
}

export default App;
