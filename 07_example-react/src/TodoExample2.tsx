import { useRef } from 'react';
import { useStateWithUndo } from './hooks/useStateWithUndo';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const TodoExample2 = () => {
  const [todos, setTodos, undo] = useStateWithUndo<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              id={todo.id.toString()}
              type='checkbox'
              checked={todo.done}
              onChange={() => setTodos(todos.map((todo) => ({ ...todo, done: !todo.done })))}
            />
            <label htmlFor={todo.id.toString()}>{todo.text}</label>
          </li>
        ))}
      </ul>
      <div>
        <input type='text' ref={inputRef} />
        <button
          onClick={() =>
            setTodos([
              ...todos,
              {
                id: todos.length + 1,
                text: inputRef.current?.value ?? '',
                done: false,
              },
            ])
          }
        >
          Add Todo
        </button>
        <button onClick={undo}>Undo</button>
      </div>
    </section>
  );
};
