// Command pattern with memento architecture
// use JSON.stringify to freeze the state at a certain moment (-> stack of states)
// and pop the last state from the stack when you want to undo it
// Notice: Use deep clone functionality when you have data
// that can't be serialized (e.g. Date, Map, Set)

// V1 Function Version
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

const addOne: CommandFunction<number> = (state) => state + 1;
const subtractOne: CommandFunction<number> = (state) => state - 1;
const createSetValue = (value: number): CommandFunction<number> => {
  return () => value;
};

const cStack_2 = createCommandStack(0);
console.log('1', cStack_2.execute(addOne));
console.log('2', cStack_2.undo());
console.log('3', cStack_2.execute(subtractOne));
console.log('4', cStack_2.undo());

const setTo42 = createSetValue(42);
console.log('5', cStack_2.execute(setTo42));
console.log('6', cStack_2.undo());

export {};
