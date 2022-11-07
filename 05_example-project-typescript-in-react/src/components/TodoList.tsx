import React from 'react';
// pull out css code and add it to single page html file;
// means that defined styles are everywhere available on site
import './TodoList.css';

// add Generic type definition for props that this component receives;
// for better readability, use interface
interface ToDoListProps {
  todos: {id: string, text: string}[]; // array of obj
  onDeleteTodo: (id: string) => void; // onDeleteHandler fn
}

const TodoList: React.FC<ToDoListProps> = ({todos, onDeleteTodo}) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {/* 
            a) only point to onDeleteTodo fn, NOT execute it with ();
            b) use bind method (which creates a bound fn that has same body as original fn) to pass 
            nevertheless needed id to fn; first argument is null because "this" isn't needed,
            second argument is first parameter of todoDeleteHandler(todoId)
          */}
          <button onClick={onDeleteTodo.bind(null, todo.id)}>Delete</button>
        </li>
      ))}    
    </ul>
  )
}

export default TodoList
