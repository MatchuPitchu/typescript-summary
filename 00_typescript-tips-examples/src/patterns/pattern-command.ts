// Command pattern
// allows you to maintain a stack of commands that you apply to a state
// you can execute and undo the command(s)

// V1 Class Version
abstract class Command<State> {
  abstract execute(state: State): State;
  abstract undo(state: State): State;
}

class CommandStack<State> {
  private stack: Command<State>[] = [];

  constructor(private _state: State) {}

  get state() {
    return this._state;
  }

  execute(command: Command<State>) {
    this._state = command.execute(this._state);
    this.stack.push(command);
  }

  undo() {
    const command = this.stack.pop();
    if (command) {
      this._state = command.undo(this._state);
    }
  }
}

// each Command should have an execute and an undo function when the Command is used
class AddOne extends Command<number> {
  execute(state: number) {
    return state + 1;
  }
  undo(state: number) {
    return state - 1;
  }
}

class SubtractOne extends Command<number> {
  execute(state: number) {
    return state - 1;
  }
  undo(state: number) {
    return state + 1;
  }
}

class SetValue extends Command<number> {
  private _originalValue?: number;

  constructor(private value: number) {
    super();
  }

  execute(state: number) {
    this._originalValue = state;
    return this.value;
  }
  undo() {
    return this._originalValue!;
  }
}

const cStack_1 = new CommandStack<number>(0);
console.log('BEFORE execution add', cStack_1.state);
cStack_1.execute(new AddOne());
console.log('AFTER execution', cStack_1.state);
cStack_1.undo();
console.log('AFTER undo', cStack_1.state);
cStack_1.execute(new SubtractOne());
console.log('AFTER execution substract', cStack_1.state);
cStack_1.undo();
console.log('AFTER undo', cStack_1.state);
cStack_1.execute(new SetValue(10));
console.log('AFTER execution SetValue', cStack_1.state);
cStack_1.undo();
console.log('AFTER undo', cStack_1.state);

// V2 Function Version
type CommandFunction<State> = (state: State) => [State, UndoFunction<State>];
type UndoFunction<State> = (state: State) => State;

const createCommandStack = <State>(state: State) => {
  const stack: UndoFunction<State>[] = [];
  let _state = state;

  return {
    execute(command: CommandFunction<State>) {
      const [newState, undoFunction] = command(_state);
      _state = newState;
      stack.push(undoFunction);
      return _state;
    },
    undo() {
      const command = stack.pop();
      if (command) {
        _state = command(_state);
      }
      return _state;
    },
  };
};

const addOne: CommandFunction<number> = (state) => [state + 1, (state) => state - 1];
const subtractOne: CommandFunction<number> = (state) => [state - 1, (state) => state + 1];
const createSetValue = (value: number): CommandFunction<number> => {
  return (state) => {
    const _originalState = state;
    return [value, () => _originalState];
  };
};

const cStack_2 = createCommandStack(0);
console.log('1', cStack_2.execute(addOne));
console.log('2', cStack_2.undo());
console.log('3', cStack_2.execute(subtractOne));
console.log('4', cStack_2.undo());

const setTo42 = createSetValue(42);
console.log('5', cStack_2.execute(setTo42));
console.log('6', cStack_2.undo());
