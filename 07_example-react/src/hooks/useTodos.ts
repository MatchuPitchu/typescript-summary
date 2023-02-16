import { useCallback, useReducer } from 'react';

interface Todo {
  id: string;
  done: boolean;
  text: string;
}

type ActionType = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: string };

type UseTodosReturn = {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

const todosReducer = (state: Todo[], action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      const id = crypto.randomUUID();
      return [...state, { id, text: action.text, done: false }];
    case 'REMOVE':
      return state.filter(({ id }) => id !== action.id);
    default:
      throw new Error();
  }
};

export const useTodos = (initialTodos: Todo[]): UseTodosReturn => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: 'ADD',
      text,
    });
  }, []);

  const removeTodo = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo };
};
