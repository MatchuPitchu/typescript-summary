// Youtube Vortrag "The Power of JS Generators by Anjana Vakil"
// https://www.youtube.com/watch?v=gu3FfmgkwUc

const fakeDataGenerator = {
  cars: ['VW', 'Skoda'],
  cities: ['Berlin', 'Dortmund', 'München'],
  [Symbol.iterator]: function* () {
    for (const car of this.cars) {
      for (let i = 1; i <= 5; i++) yield `${car} No.${i}`;
      for (const city of this.cities) yield `${car} in ${city}`;
    }
  },
};

const fakeData = [...fakeDataGenerator];
console.log('Data Generator', fakeData);

function* numberCreator() {
  let count = 1;
  while (true) {
    yield count;
    count++;
  }
}

function* take(n: number, iterable: Iterable<number>) {
  for (const item of iterable) {
    if (n <= 0) return;
    n--;
    yield item;
  }
}

const taken = [...take(10, numberCreator())];
console.log('Taken', taken);

function* map<T>(iterable: Iterable<T>, mapFn: (value: T) => T) {
  for (const item of iterable) {
    yield mapFn(item);
  }
}

const squares = [
  ...take(
    10,
    map(numberCreator(), (value) => value * value)
  ),
];
console.log('Squares', squares);
