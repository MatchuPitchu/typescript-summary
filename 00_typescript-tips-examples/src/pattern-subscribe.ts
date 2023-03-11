// Pub and Sub Patterns

// VERSION 1: Pub-Sub Function Variant
export const createSubscribable = <MessageType>() => {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  // return object with methods that handle subscribers Set
  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },

    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg));
    },
  };
};

const sub = createSubscribable<string>();

// do eta reduction version instead of
// sub.subscribe((msg: string) => console.log(msg));
const unsubscribe = sub.subscribe(console.log);

sub.publish('foo');
sub.publish('bar');

unsubscribe();
sub.publish('hello'); // not logged after unsubscribe

// VERSION 2: Pub-Sub Class Variant
// Step 1
// Create Subscribable class
export class Subscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set();

  constructor() {}

  subscribe(cb: (msg: MessageType) => void): () => void {
    this.subscribers.add(cb);

    return () => this.subscribers.delete(cb);
  }

  publish(msg: MessageType): void {
    this.subscribers.forEach((cb) => cb(msg));
  }
}

// Step 2
// Extend class
class DataClass extends Subscribable<number> {
  constructor(public value?: number) {
    super();
  }

  setValue(value: number) {
    this.value = value;
    this.publish(value);
  }
}

const dc = new DataClass();
const dcUnsubscribe1 = dc.subscribe((value: number) => console.log(`DC1: ${value}`));
const dcUnsubscribe2 = dc.subscribe((value: number) => console.log(`DC2: ${value}`));
dc.setValue(10);
dcUnsubscribe1();
dcUnsubscribe2();
