import { String, Union } from 'ts-toolbelt';
import * from './mapped-types'

/*********************** ***********************/
// [1] Derive a union type from an object
const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 26,
};

// Expected result of type after transformation
type SingleFruitCount1 =
  | {
      apple: number;
    }
  | {
      banana: number;
    }
  | {
      pear: number;
    };

type FruitCounts = typeof fruitCounts;

type SingleFruitCount2 = {
  [K in keyof FruitCounts]: {
    [K2 in K]: number;
  };
}[keyof FruitCounts]; // [] -> map over our SingleFruitCount2 type to get rid of parent keys [K in keyof FruitCounts], and create a union type like SingleFruitCount1.

const singleFruitCount: SingleFruitCount2 = {
  banana: 12,
};

/*********************** ***********************/
// [2] Use 'in' operator to transform a union to another union
export type Entity =
  | {
      type: 'user';
    }
  | {
      type: 'post';
    }
  | {
      type: 'comment';
    };

// Expected result of type after transformation
type EntityWithId1 =
  | {
      type: 'user';
      userId: string;
    }
  | {
      type: 'post';
      postId: string;
    }
  | {
      type: 'comment';
      commentId: string;
    };

type EntityWithId2 = {
  [EntityType in Entity['type']]: {
    type: EntityType;
  } & Record<`${EntityType}Id`, string>;
}[Entity['type']];

/*********************** ***********************/
// [3]  Decode URL search params at the type level with ts-toolbelt
const query = `/home?a=foo&b=wow`;

type Query = typeof query;
type SecondQueryPart = String.Split<Query, '?'>[1];
type QueryElements = String.Split<SecondQueryPart, '&'>;

type QueryParams = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, '='>[0]]: String.Split<QueryElement, '='>[1];
  };
}[QueryElements[number]];

const obj1: Union.Merge<QueryParams> = {
  a: 'foo',
  b: 'wow',
};

// Use function overloads and generics to type a compose function
function compose<Input, FirstArg>(fn: (input: Input) => FirstArg): (input: Input) => FirstArg;

function compose<Input, FirstArg, SecondArg>(
  fn: (input: Input) => FirstArg,
  fn2: (input: FirstArg) => SecondArg
): (input: Input) => SecondArg;

function compose<Input, FirstArg, SecondArg, ThirdArg>(
  fn: (input: Input) => FirstArg,
  fn2: (input: FirstArg) => SecondArg,
  fn3: (input: SecondArg) => ThirdArg
): (input: Input) => ThirdArg;

function compose(...args: any[]) {
  // ... logic
  return {} as any;
}

const addOne = (a: number) => a + 1;

const numToString = (a: number) => a.toString();

const stringToNum = (a: string) => parseInt(a);

const addOneToString = compose(addOne, numToString, stringToNum);
// const wrongComposition = compose(numToString, addOne, stringToNum);

/*********************** ***********************/
// [4] Use 'extends' keyword to narrow the value of a generic
const getDeepValue = <Obj, FirstKey extends keyof Obj, SecondKey extends keyof Obj[FirstKey]>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
): Obj[FirstKey][SecondKey] => {
  // ... logic
  return {} as any;
};

const obj2 = {
  foo: { a: true, b: 1 },
  bar: { c: 'test', d: 2 },
};

const result = getDeepValue(obj2, 'bar', 'd');

/*********************** ***********************/
// [5] Create your own 'objectKeys' function using generics and the 'keyof' operator
const obj3 = {
  a: 1,
  b: 2,
  c: 3,
};

const objectKeys = <Obj extends {}>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

// without custom objectKeys fn "key" is only typed as string
// Object.keys(obj3).forEach((key) => console.log(obj3[key]));
objectKeys(obj3).forEach((key) => console.log(obj3[key]));

/*********************** ***********************/
// [6] Create a 'key remover' function which can process any generic object
// function that removes keys from an object
const makeKeyRemover =
  <Key extends string>(...keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };

const keyRemover = makeKeyRemover('a', 'b');

const obj4 = { a: 1, b: 2, c: 3 };
const newObject = keyRemover(obj4);

/*********************** ***********************/
// [7] Map over a union type
type Letters = 'a' | 'b' | 'c';

// you can map over a union with this ternary expression
// if 'c' is found then "c" is replaced by 'never' or whatever you want
type RemoveC<TType> = TType extends 'c' ? never : TType;

type LettersWithoutC = RemoveC<Letters>;

/*********************** ***********************/
// [8] Throw detailed error messages for type checks
// check at type level if argument is of type array -> then return a string "error" message
type CheckForBadArgs<Arg> = Arg extends any[] ? 'You cannot compare two arrays using deepEqualCompare' : Arg;

const deepEqualCompare = <Arg>(a: CheckForBadArgs<Arg>, b: CheckForBadArgs<Arg>): boolean => {
  if (Array.isArray(a) || Array.isArray(b)) {
    throw new Error('You cannot compare two arrays using deepEqualCompare');
  }
  return a === b;
};

deepEqualCompare(1, 1);
deepEqualCompare([], ['a']);

/*********************** ***********************/
// [9] Create autocomplete helper which allows for arbitrary values
// a) with "string" you would lose autocomplete functionality for 'sm' and 'xs'
type IconSize = 'sm' | 'xs' | string;
// b) use Omit utility type: you omit xs or sm from the union, and now TS won't collapse these three things and you'll have autocomplete again
type IconSize2 = 'sm' | 'xs' | Omit<string, 'xs' | 'sm'>;
// c) convert b) into type helper
type IconSize3 = LooseAutocomplete<'sm' | 'xs'>;
type LooseAutocomplete<T extends string> = T | Omit<string, T>;

interface IconmProps {
  size: IconSize3;
}

const Icon = (props: IconmProps) => {
  return null;
};

const Component = () => {
  // return (
  //   <>
  //     <Icon size='xs'></Icon>
  //     <Icon size='something'></Icon>
  //   </>
  // )
};

/*********************** ***********************/
// [10] Turn a module into a type
// a) this is a module file: constants.ts
// export const ADD_TODO = 'ADD_TODO';
// export const REMOVE_TODO = 'REMOVE_TODO';
// export const EDIT_TODO = 'EDIT_TODO';

// b) derive a type that looks like the union type below
// type Action = 'ADD_TODO' | 'REMOVE_TODO' | 'EDIT_TODO';
type ActionModule = typeof import('./constants');
type Action = ActionModule[keyof ActionModule]; // take keys of type object and maps over them to create a union type
