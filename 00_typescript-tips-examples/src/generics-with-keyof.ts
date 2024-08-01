// Example 1
const pluckOut = <DataType, KeyType extends keyof DataType>(items: DataType[], key: KeyType): DataType[KeyType][] => {
  return items.map((item) => item[key]);
};

const dogs = [
  { name: 'Mimi', age: 5 },
  { name: 'Momo', age: 13 },
];

console.log(pluckOut(dogs, 'name')); // ['Mimi', 'Momo']
console.log(pluckOut(dogs, 'age')); // [5, 13]

// Example 2: Create an Event Map including all possible event function names with their needed data
interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productId: string };
  checkout: BaseEvent;
}

const sendEvent = <EventName extends keyof EventMap>(name: EventName, data: EventMap[EventName]): void => {
  console.log([name, data]);
};

sendEvent('addToCart', { productId: 'foo', user: 'bar', quantity: 1, time: 10 });
sendEvent('checkout', { time: 20, user: 'bar' });
