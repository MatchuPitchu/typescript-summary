//  React hooks testing utilities
// https://github.com/testing-library/react-hooks-testing-library
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useTodos } from './useTodos';

const mockCrypto = {
  randomUUID: vi.fn(() => 'test-uuid'),
};

// set up crypto property globally (with help of globalThis)
// window.crypto in browser
// global.crypto in non-browser (Node)
Object.defineProperty(globalThis, 'crypto', {
  value: mockCrypto,
});

vi.mock('crypto', () => mockCrypto);

describe('useTodos', () => {
  afterEach(() => {
    mockCrypto.randomUUID.mockClear();
  });

  it('addTodo should add a new todo to the list', () => {
    const initialTodos = [{ id: '1', done: false, text: 'Todo 1' }];
    const { result } = renderHook(() => useTodos(initialTodos));

    act(() => {
      /* inside act() code you want to apply to the DOM */
      result.current.addTodo('New Todo');
    });

    expect(mockCrypto.randomUUID).toHaveBeenCalledTimes(1);

    expect(result.current.todos).toEqual([
      { id: '1', done: false, text: 'Todo 1' },
      { id: expect.any(String), done: false, text: 'New Todo' },
    ]);
  });

  it('removeTodo should remove a todo from the list', () => {
    const initialTodos = [
      { id: '1', done: false, text: 'Todo 1' },
      { id: '2', done: false, text: 'Todo 2' },
    ];
    const { result } = renderHook(() => useTodos(initialTodos));

    act(() => {
      result.current.removeTodo('1');
    });

    expect(result.current.todos).toEqual([{ id: '2', done: false, text: 'Todo 2' }]);
  });
});
