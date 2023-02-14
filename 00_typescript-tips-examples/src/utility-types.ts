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
export const mapById = (users: MyUser[]): Record<MyUser['id'], UserWithoutID> => {
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
