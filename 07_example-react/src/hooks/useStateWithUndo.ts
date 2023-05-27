import { useCallback, useRef, useState } from 'react';

// Command Pattern with Memento architecture
type CommandFunction<State> = (state: State) => State;

const createCommandStack = <State>(state: State) => {
  const stack: string[] = [JSON.stringify(state)];

  return {
    execute(command: CommandFunction<State>) {
      const currentState = JSON.parse(stack.at(-1) ?? '');
      const newState = command(currentState);
      stack.push(JSON.stringify(newState));

      console.log('Current Stack', stack);

      return newState;
    },
    undo() {
      if (stack.length > 1) {
        stack.pop();
      }
      return JSON.parse(stack.at(-1) ?? '');
    },
  };
};

type ReturnType<DataType> = [DataType, (state: DataType) => void, () => void];

export const useStateWithUndo = <DataType>(initialState: DataType): ReturnType<DataType> => {
  const [state, setState] = useState<DataType>(initialState);
  const stack = useRef(createCommandStack(initialState));

  const updateState = useCallback((value: DataType) => {
    const newState = stack.current.execute(() => value);
    setState(newState);
  }, []);

  const undo = useCallback(() => {
    const newState = stack.current.undo();
    setState(newState);
  }, []);

  return [state, updateState, undo];
};
