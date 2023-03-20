# Examples with TypeScript Tips

## Derive a union type from an object

> Video and Article: <https://www.totaltypescript.com/tips/derive-a-union-type-from-an-object>

- change `object type` into `union type`

```TypeScript
const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 26,
}

// Expected result of type after transformation
// type SingleFruitCount1 =
//   | {
//       apple: number
//     }
//   | {
//       banana: number
//     }
//   | {
//       pear: number
//     }

type FruitCounts = typeof fruitCounts;

type SingleFruitCount2 = {
  [K in keyof FruitCounts]: {
    [K2 in K]: number
  };
}[keyof FruitCounts]; // [] -> map over our SingleFruitCount2 type to get rid of parent keys [K in keyof FruitCounts], and create a union type like SingleFruitCount1.

const singleFruitCount: SingleFruitCount2 = {
  banana: 12,
}
```

## Use 'in' operator to transform a union to another union

> Video and Article: <https://www.totaltypescript.com/tips/use-in-operator-to-transform-a-union-to-another-union>

```TypeScript
export type Entity =
  | {
    type: "user"
    }
  | {
    type: "post"
    }
  | {
      type: "comment"
    }

// Expected result of type after transformation
// type EntityWithId1 =
//   | {
  //       type: "user"
//       userId: string
//     }
//   | {
  //       type: "post"
//       postId: string
//     }
//   | {
  //       type: "comment"
//       commentId: string
//     }

type EntityWithId2 = {
  [EntityType in Entity['type']]: {
    type: EntityType
  } & Record<`${EntityType}Id`, string>
}[Entity['type']];
```

## Decode URL search params at the type level with ts-toolbelt

```TypeScript
const query = `/home?a=foo&b=wow`

// Expected result: transform URL search params into this object
const obj: Union.Merge<QueryParams> = {
  a: "foo",
  b: "wow",
}
```

```TypeScript
import { String, Union } from 'ts-toolbelt';

const query = `/home?a=foo&b=wow`

type Query = typeof query;

type SecondQueryPart = String.Split<Query, "?">[1];

type QueryElements = String.Split<SecondQueryPart, '&'>;

type QueryParams = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, '='>[0]]: String.Split<QueryElement, '='>[1];
  };
}[QueryElements[number]];

const obj: Union.Merge<QueryParams> = {
  a: "foo",
  b: "wow",
}
```

## Use function overloads and generics to type a compose function

> Video and Article: <https://www.totaltypescript.com/tips/use-function-overloads-and-generics-to-type-a-compose-function>

- use `function overloads` in this example to generate a typed function that allows a specific order of a concatenation of function returns -> if the `composition` with passed in functions as arguments are not compatible in this order, then TS shows a warning

```TypeScript
function compose<Input, FirstArg>(
  fn: (input: Input) => FirstArg
): (input: Input) => FirstArg;

function compose<Input, FirstArg, SecondArg>(
  fn: (input: Input) => FirstArg,
  fn2: (input: FirstArg) => SecondArg
): (input: Input) => SecondArg;

function compose<Input, FirstArg, SecondArg, ThirdArg>(
  fn: (input: Input) => FirstArg,
  fn2: (input: FirstArg) => SecondArg,
  fn3: (input: SecondArg) => ThirdArg
): (input: Input) => ThirdArg;

function compose (...args: any[]) {
  // ... logic

  return {} as any;
};

const addOne = (a: number) => a + 1;

const numToString = (a: number) => a.toString();

const stringToNum = (a: string) => parseInt(a);

const addOneToString = compose(addOne, numToString, stringToNum)
```

## Use 'extends' keyword to narrow the value of a generic

> Video and Article: <https://www.totaltypescript.com/tips/use-extends-keyword-to-narrow-the-value-of-a-generic>

```TypeScript
const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
): Obj[FirstKey][SecondKey] => {
  return {} as any;
}

const obj = {
  foo: { a: true, b: 1 },
  bar: { c: 'test', d: 2 },
}

const result = getDeepValue(obj, "bar", "d")
```

## Write your own 'PropsFrom' helper to extract props from any React component

> Video and Article: <https://www.totaltypescript.com/tips/write-your-own-propsfrom-helper-to-extract-props-from-any-react-component>

```TSX
const MyComponent = (props: { enabled: boolean }) => {
  return null;
}

type PropsFrom<TComponent> = TComponent extends React.FC<infer Props> ? Props : never

const props: PropsFrom<typeof MyComponent> = {
  enabled: true,
}
```

## Use generics in React to make dynamic and flexible components

> Video and Article: <https://www.totaltypescript.com/tips/use-generics-in-react-to-make-dynamic-and-flexible-components>

```TSX
interface TableProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
}

// Generic not allowed with arrow function -> const Table = <TItem>(props: TableProps) => {
function Table<TItem>(props: TableProps<TItem>) {
  return null
};

const Component = () => {
  return (
    // OPTION: to replace the generic type for a specific component usage: <Table<{ id: number }> ...
    <Table
      items={[
        {
          id: '1',
          name: 'Matchu',
        }
      ]}
      renderItem={(item) => <div>{item.id}</div>}
    ></Table>
  );
}

```

## Create your own 'objectKeys' function using generics and the 'keyof' operator

> Video and Article: <https://www.totaltypescript.com/tips/create-your-own-objectkeys-function-using-generics-and-the-keyof-operator>

```TypeScript
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
```

## Create a 'key remover' function which can process any generic object

> Video and Article: <https://www.totaltypescript.com/tips/create-a-key-remover-function-which-can-process-any-generic-object>

```TypeScript
// function that removes keys from an object
const makeKeyRemover =
  <Key extends string>(...keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };

const keyRemover = makeKeyRemover('a', 'b');

const obj4 = { a: 1, b: 2, c: 3 };
const newObject = keyRemover(obj4);
```

## Map over a union type

> Video and Article: <https://www.totaltypescript.com/tips/map-over-a-union-type>

```TypeScript
type Letters = "a" | "b" | "c";

// you can map over a union with this ternary expression
// if 'c' is found then "c" is replaced by 'never' or whatever you want
type RemoveC<TType> = TType extends 'c' ? never : TType;

type LettersWithoutC = RemoveC<Letters>;
```

## Get a TypeScript package ready for release to NPM in under 2 minutes

> Video and Article: <https://www.totaltypescript.com/tips/get-a-typescript-package-ready-for-release-to-npm-in-under-2-minutes>

- use `preconstruct`: <https://www.npmjs.com/package/@preconstruct/cli>

## Throw detailed error messages for type checks

> Video and Article: <https://www.totaltypescript.com/tips/throw-detailed-error-messages-for-type-checks>

```TypeScript
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
```

## Create autocomplete helper which allows for arbitrary values

> Video and Article: <https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values>

```TSX
// a) with "string" you would lose autocomplete functionality for 'sm' and 'xs'
type IconSize = 'sm' | 'xs' | string;
// b) use Omit utility type: you omit xs or sm from the union, and now TS won't collapse these three things and you'll have autocomplete again
type IconSize2 = 'sm' | 'xs' | Omit<string, 'xs' | 'sm'>;
// c) convert b) into type helper
type IconSize3 = LooseAutocomplete<'sm' | 'xs'>;
type LooseAutocomplete<T extends string> = T | Omit<string, T>


interface IconmProps {
  size: IconSize3;
}

const Icon = (props: IconmProps) => {
  return null;
};

const Component = () => {
  return (
    <>
      <Icon size='xs'></Icon>
      <Icon size='something'></Icon>
    </>
  )
}
```

## Turn a module into a type

> Video and Article: <https://www.totaltypescript.com/tips/turn-a-module-into-a-type>

```TypeScript
// a) this is a module file: contants.ts
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

// b) derive a type that looks like the union type below
// type Action = 'ADD_TODO' | 'REMOVE_TODO' | 'EDIT_TODO';
type ActionModule = typeof import('./contants');
type Action = ActionModule[keyof ActionModule]; // take keys of type object and maps over them to create a union type
```
