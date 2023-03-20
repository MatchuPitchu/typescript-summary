import { createContext, ReactNode, useCallback, useContext, useReducer } from 'react';

interface Todo {
  id: string;
  done: boolean;
  text: string;
}

type ActionType = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: string };

export type UseTodosManagerReturn = {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

interface TodosProvider {
  initialTodos: Todo[];
  children: ReactNode;
}

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

const useTodosManager = (initialTodos: Todo[]): UseTodosManagerReturn => {
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

export const TodoContext = createContext<UseTodosManagerReturn>({} as UseTodosManagerReturn);

export const useTodosContext = (): UseTodosManagerReturn => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within TodosProvider');

  return {
    todos: context.todos,
    addTodo: context.addTodo,
    removeTodo: context.removeTodo,
  };
};

export const TodosProvider = ({ initialTodos, children }: TodosProvider) => {
  // V1: longer with const value
  // const value = useTodosManager(initialTodos);

  // V2: shorter hook return directly set as value
  return <TodoContext.Provider value={useTodosManager(initialTodos)}>{children}</TodoContext.Provider>;
};
