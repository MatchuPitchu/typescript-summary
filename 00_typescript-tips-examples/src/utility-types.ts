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

const mappedUsers = mapById([
  {
    id: 1,
    name: 'Matchu',
  },
  { id: 2, name: 'Pitchu' },
]);

console.log(mappedUsers);
