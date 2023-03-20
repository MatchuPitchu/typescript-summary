// TypeScript Mapped Types
// A mapped type has this formula: type B = type A + transformation
// https://www.lloydatkinson.net/posts/2022/going-further-with-typescript-part-1/
export type User = {
  name: string;
};

// target type
type GetUser = {
  getName: () => string;
};

// create target typpe automatically with a mapped type
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

// step by step explanation
type Getters1<Type> = {
  [Property in keyof Type]: Type[Property];
};

type UserCopy = Getters1<User>;

type Getters2<Type> = {
  [Property in keyof Type]: () => Type[Property];
};

type UserCopyAndTransformed = Getters2<User>;

type Getters3<Type> = {
  [Property in keyof Type as `get${string & Property}`]: () => Type[Property];
};

type UserGetters1 = Getters3<User>;

// adding additional abstraction
type Prefix<Type, Prefix extends string> = {
  [Property in keyof Type as `${Prefix}${Capitalize<string & Property>}`]: Type[Property];
};

type Suffix<Type, Suffix extends string> = {
  [Property in keyof Type as `${Lowercase<string & Property>}${Capitalize<Suffix>}`]: Type[Property];
};

// with prefix
type GetterNames<Type> = Prefix<Type, 'get'>;

type GetterFunctions<Type> = {
  [Property in keyof Type]: () => Type[Property];
};

// 1) e.g. User is transformed in GetterNames<User> to type User = { getName: string }
// 2) e.g. User of 1) is transformed in GetterFunctions<User> to type User = { getName: () => string }
type Getters4<Type> = GetterFunctions<GetterNames<Type>>;

type UserGettersPrefix = Getters4<User>;

// with suffix
type SuffixNames<Type> = Suffix<Type, 'handler'>;

type Getters5<Type> = GetterFunctions<SuffixNames<Type>>;

type UserGettersSuffix = Getters5<User>;
