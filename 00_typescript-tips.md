# Examples with TypeScript Tips

## Derive a union type from an object

> Video and Article: <https://www.totaltypescript.com/tips/derive-a-union-type-from-an-object>

- change `object type` into `union type`

```TypeScript
export const fruitCount = {
  apple: 1,
  pear: 4,
  banana: 26,
}

type SingleFruitCount1 =
  | {
      apple: number
    }
  | {
      banana: number
    }
  | {
      pear: number
    }

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

// Expected result of type
// type EntityWithId =
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

type EntityWithId = {
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

function compose (...args: any[]) => {
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
