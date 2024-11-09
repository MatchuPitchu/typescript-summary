// Object.assign({}, {}) on type level
// Video Matt Pocock: https://www.youtube.com/watch?v=jEeQC6I8nlY
type Prettify<T> = {
  [Key in keyof T]: T[Key];
} & {};

type Merge<T1, T2> = Prettify<Omit<T1, keyof T2> & T2>;

type MergeArrayOfObjects<TArray extends readonly object[], T1 = {}> = TArray extends [
  infer T2 extends object,
  ...infer TRest extends object[]
]
  ? MergeArrayOfObjects<TRest, Merge<T1, T2>>
  : T1;

type Example = MergeArrayOfObjects<[{ foo: number; bar: boolean }, { foo: string }, { bar: string }]>;

const merge = <TArray extends readonly object[]>(...objects: TArray): MergeArrayOfObjects<TArray> => {
  return Object.assign({}, ...objects);
};

const example = merge({ foo: 1, bar: true }, { foo: 'hello' }, { bar: 'world' });
