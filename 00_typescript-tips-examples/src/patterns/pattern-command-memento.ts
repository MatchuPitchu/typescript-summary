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

const commandStack = new CommandStack<number>(0);
console.log('BEFORE execution add', commandStack.state);
commandStack.execute(new AddOne());
console.log('AFTER execution', commandStack.state);
commandStack.undo();
console.log('AFTER undo', commandStack.state);
commandStack.execute(new SubtractOne());
console.log('AFTER execution substract', commandStack.state);
commandStack.undo();
console.log('AFTER undo', commandStack.state);
commandStack.execute(new SetValue(10));
console.log('AFTER execution SetValue', commandStack.state);
commandStack.undo();
console.log('AFTER undo', commandStack.state);
