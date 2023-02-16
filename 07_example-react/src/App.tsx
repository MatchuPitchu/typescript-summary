import { useRef } from 'react';
import { useTodos } from './hooks/useTodos';
import './App.css';

const initialTodoState = [{ id: crypto.randomUUID(), text: 'learn react', done: false }];

const App = () => {
  const { todos, addTodo, removeTodo } = useTodos(initialTodoState);

  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (!todoInputRef.current || !todoInputRef.current.value) return;
    addTodo(todoInputRef.current.value);
    todoInputRef.current.value = '';
  };

  const handleRemoveTodo = (id: string) => removeTodo(id);

  return (
    <div className='App'>
      <input type='text' ref={todoInputRef} />
      {todos.map(({ id, text }) => (
        <div key={id}>
          {text}
          <button onClick={() => handleRemoveTodo(id)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default App;
