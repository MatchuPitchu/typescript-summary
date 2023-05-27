import { useRef } from 'react';
import { TodosProvider, useTodosContext } from './context/TodoContext';
import { UList } from './UList';
import './App.css';

const Todos = () => {
  const { todos, addTodo, removeTodo } = useTodosContext();

  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (!todoInputRef.current || !todoInputRef.current.value) return;
    addTodo(todoInputRef.current.value);
    todoInputRef.current.value = '';
  };

  const handleRemoveTodo = (id: string) => removeTodo(id);

  return (
    <div>
      <input type='text' ref={todoInputRef} />

      {/* V1: todos list */}
      {/* <ul>
        {todos.map(({ id, text }) => (
          <li key={id}>
            {text}
            <button onClick={() => handleRemoveTodo(id)}>Remove</button>
          </li>
        ))}
      </ul> */}

      {/* V2: generic UL component */}
      <UList
        className='ul-generic'
        handleItemClick={(item) => alert(item.id)}
        items={todos}
        render={(todo) => (
          <>
            {todo.text}
            <button
              onClick={(event) => {
                // prevent propagation of event in capturing and bubbling phases
                // otherwise would also trigger click event on <li>
                event.stopPropagation();
                handleRemoveTodo(todo.id);
              }}
            >
              Remove
            </button>
          </>
        )}
      />

      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

const initialTodos = [{ id: crypto.randomUUID(), text: 'learn react', done: false }];

export const TodoExample1 = () => (
  <TodosProvider initialTodos={initialTodos}>
    <section className='wrapper'>
      <Todos />
      <Todos />
    </section>
  </TodosProvider>
);
