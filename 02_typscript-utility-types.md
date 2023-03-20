# Utility Types

> Documentation: <https://www.typescriptlang.org/docs/handbook/utility-types.html>

- `ReturnType<Type>` and `Awaited<Type>`

```typescript
import { getContent } from '@some-package-not-giving-return-type-of-getContent-fn';
const content = await getContent();

type Content = Awaited<ReturnType<typeof getContent>>;
```

- `Parameters<Type>`: Constructs a tuple type from the types used in the parameters of a function type Type.
- `NonNullable<Type>`: Constructs a type by excluding null and undefined from Type

```typescript
declare function myFunction(arg: { a: number; b: string }, optionalArg?: boolean): void;

type MyFunction = Parameters<typeof myFunction>; // [arg: { a: number; b: string }, optionalArg?: boolean | undefined]

type MyFunctionNonNullable = NonNullable<Parameters<typeof myFunction>>;
```

- `Readonly<Type>`: Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned
- `ArrayReadonly<Type>`

```tsx
type Event = { title: string; date: Date; attendees: string[] };

const Edit = () => {
  const [event, setEvent] = useState<Readonly<Event>>();

  return (
    <input
      placeholder='Event title'
      value={event.title}
      onChange={(e) => {
        // in React never mutate directly state, even if it's possible technically
        // Readonly utility type prevents this
        // ❌
        event.title = e.target.value; // Error: Cannot assign to 'title' because it is a read-only property

        // ✅
        setState({ ...event, title: e.target.value });
      }}
    />
  );
};

// Notice: Readonly only applies to top level properties of the object. We can still mutate nested properties and arrays without errors:
type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? DeepReadonlyArray<U>
  : DeepReadonlyObject<T>;

type Primitive = string | number | boolean | undefined | null;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [Property in keyof T]: DeepReadonly<T[Property]>;
};

const Edit = () => {
  const [event, setEvent] = useState<DeepReadonly<Event>>();
  // ...

  event.attendees.push('foo'); // Error
};
```
