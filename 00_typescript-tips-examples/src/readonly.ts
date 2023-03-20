export {};

interface Cat {
  readonly name: string; // makes specific property readonly
  breed: string;
}

// 1) Readonly<Type> utility type
const makeCat = (name: string, breed: string): Readonly<Cat> => {
  return {
    name,
    breed,
  };
};

const myCat = makeCat('Foo', 'Bar');
myCat.name = 'New Name';

// 2) readonly tuples
const makeCoordinate = (x: number, y: number, z: number): readonly [number, number, number] => {
  return [x, y, z];
};

const coordinates = makeCoordinate(10, 20, 30);
coordinates[0] = 20;

// 3) 'as const' to make all items of array immutable
const reallyConst = [1, 2, 3] as const;
reallyConst[0] = 50;
