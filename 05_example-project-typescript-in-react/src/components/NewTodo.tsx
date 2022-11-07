import React, { useRef } from 'react';
// pull out css code and add it to single page html file;
// means that defined styles are everywhere available on site
import './NewTodo.css';

// use interface or type definition for passed props
type NewTodoProps = {
  onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({onAddTodo}) => {

  // use useRef hook to create new reference object const that stores HTMLInputElement;
  // default value for first rendering has to be null, because object points to nothing yet before first rendering of return (...)
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const input = textInputRef.current!.value;
    onAddTodo(input);
  }

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default NewTodo
