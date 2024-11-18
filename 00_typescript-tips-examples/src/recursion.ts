// Video Tutorial: https://www.youtube.com/watch?v=6k20-gRH2tI

type NestedPromise = Promise<Promise<Promise<string>>>;

type UnnestedPromiseType = Awaited<NestedPromise>;
//   ^?

type NestedArray = Array<Array<Array<number>>>;
//   ^?

type UnnestedArray<T> = T extends Array<infer U> ? UnnestedArray<U> : T;

type Check = UnnestedArray<NestedArray>;
//   ^?
