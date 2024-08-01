interface MyUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

// Partial
type MyUserOptionals = Partial<MyUser>;

// Required
type RequiredMyUser = Required<MyUser>;

// Pick
type JustEmailAndName = Pick<MyUser, 'email' | 'name'>;

// Omit
type UserWithoutID = Omit<MyUser, 'id'>;

// Record
const mapById = (users: MyUser[]): Record<MyUser['id'], UserWithoutID> => {
  return users.reduce((accumulator, user) => {
    const { id, ...rest } = user;
    return {
      ...accumulator,
      [id]: rest,
    };
  }, {});
};

const users = [
  {
    id: 1,
    name: 'Matchu',
  },
  { id: 2, name: 'Pitchu' },
];

console.log('mapById', mapById(users)); // { 1: { name: 'Matchu' }, 2: { name: 'Pitchu' } };

// FUNCTIONS
// Parameters<T> and ReturnType<T>
type GenericFunction = (...args: any[]) => any;
type Name = { first: string; last: string };

const names: Name[] = [
  { first: 'Matchu', last: 'Pitchu' },
  { first: 'Ken', last: 'Guru' },
];

const addFullName = (name: Name): Name & { fullName: string } => {
  return { ...name, fullName: `${name.first} ${name.last}` };
};

const permuteRows = <T extends GenericFunction>(iteratorFunction: T, data: Parameters<T>[0][]): ReturnType<T>[] => {
  return data.map(iteratorFunction);
};

console.log('permuteRows', permuteRows(addFullName, names));
// [
//   { first: 'Matchu', last: 'Pitchu', fullName: 'Matchu Pitchu' },
//   { first: 'Ken', last: 'Guru', fullName: 'Ken Guru' },
// ];

// CLASSES WITH CONSTRUCTOR FUNCTIONS
// ConstructorParameters<T> and InstanceType<T>
class PersonWithFullName {
  constructor(public name: Name) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

type GenericConstructor = new (...args: any[]) => any;

const createObjects = <T extends GenericConstructor>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] => {
  return data.map((item) => new ObjectType(item));
};

console.log(
  'createObjects',
  createObjects(PersonWithFullName, names).map((obj) => obj.fullName)
); // ['Matchu Pitchu', 'Ken Guru'];

// Extract<Type, Union>
// utility for pulling out values that are shared between the two type arguments it receives
// constructs a type by extracting from Type all union members that are assignable to Union
type E0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
// type E0 = "a"
type E1 = Extract<string | number | (() => void), Function>;
// type E1 = () => void
type E2 = Extract<{ type: 'LOGIN'; id: string }, { type: 'LOGIN' }>;
// type E2 = { type: 'LOGIN'; id: string }

interface User {
  name: string;
  email: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

type E3 = Extract<keyof User, keyof UserProfile>;
// type E3 = "email" | "name"

// create directly a new object type with the shared properties of 2 types
type IntersectionObj<T, U> = {
  [Property in Extract<keyof T, keyof U>]: T[Property];
};

type E4 = IntersectionObj<User, UserProfile>;
// type E4 = { email: string; name: string }

// Exclude<Type, Union>
// inverse of Exclude, returns all of the values present in T, but not in U
type Exc1 = Exclude<keyof UserProfile, keyof User>;
// type Exc1 = "id" | "image"

// NonNullable<Type>
// Constructs a type by excluding null and undefined from Type
type N1 = NonNullable<string[] | null | undefined>;
// type N1 = string[]
