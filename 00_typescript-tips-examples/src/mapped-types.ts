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

// create target type automatically with a mapped type
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

// step by step explanation
type Copy<Type> = {
  [Property in keyof Type]: Type[Property];
};

type UserCopy = Copy<User>;

type CopyAndTransform<Type> = {
  [Property in keyof Type]: () => Type[Property];
};

type UserCopyAndTransformed = CopyAndTransform<User>;

type GettersWithoutCapitalize<Type> = {
  [Property in keyof Type as `get${string & Property}`]: () => Type[Property];
};

type UserGetters = GettersWithoutCapitalize<User>;

// adding additional abstraction
type Prefix<Type, Prefix extends string> = {
  [Property in keyof Type as `${Prefix}${Capitalize<string & Property>}`]: Type[Property];
};

type Suffix<Type, Suffix extends string> = {
  [Property in keyof Type as `${Lowercase<string & Property>}${Capitalize<Suffix>}`]: Type[Property];
};

// with prefix
type GetterNamesOf<Type> = Prefix<Type, 'get'>;

type FunctionTypesOf<Type> = {
  [Property in keyof Type]: () => Type[Property];
};

// 1) e.g. User is transformed in GetterNamesOf<User> to type User = { getName: string }
// 2) e.g. User of 1) is transformed in FunctionTypesOf<User> to type User = { getName: () => string }
type GettersOf<Type> = FunctionTypesOf<GetterNamesOf<Type>>;

type UserGettersPrefix = GettersOf<User>;

// with suffix
type SuffixNamesOf<Type> = Suffix<Type, 'handler'>;

type Handlers<Type> = FunctionTypesOf<SuffixNamesOf<Type>>;

type UserHandlersSuffix = Handlers<User>;
