// Advanced Types

// 1) Intersection Types with "&" sign
// 1a) combining object types - put all properties together in combined object type
type Admin = { 
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// if I'd use interface Admin and inferace Employee instead of type ...
// then combination would be possible also with interface ElevatedEmployee extends Employee, Admin {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Matchu',
  privileges: ['create-server', 'delete database'],
  startDate: new Date(),
}

type Combination = string | number;
type Numeric = number | boolean;
// 1b) "Universal" is of type number because it's the intersection of both union types above
type Universal = Combination & Numeric;

// 6) Function Overloads
// to tell TS what's the exact return if arguments are of this or this type; can add as many predefined conditions as I like
// 6a) only works with function declaration, not function expression
function add7(a: number, b: number): number;
function add7(a: string, b: string): string;
function add7(a: string, b: number): string;
function add7(a: number, b: string): string;
function add7(a: Combinable, b: Combinable) {
  // 2) Type Guards: Approach of checking if a certain property or method exists before you use it
  // 2a) next line is called type guard; to ensure that code runs correctly in runtime even with union types
  if(typeof a === 'string' || typeof b === 'string') return a.toString() + b.toString();
  return a + b;
}

// 6b) .split() only available for type string, but TS thinks that string | number is type, so it's an error
const result = add7('Matchu', 'Pitchu') // one solution would be to add here "as string", but function overload is the recommanded solution
result.split(' ')

type UnknownEmployee = Employee | Admin;

const printEmployeeInformation = (emp: UnknownEmployee) => {
  console.log('Name: ' + emp.name);
  // 2b) need type guard to be sure that privileges exists as property of obj;
  // use key (as a string) in obj to check if this key is in obj
  if('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges)
  }
  if('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate)
  }
};
printEmployeeInformation(e1);

class Car {
  drive() {
    console.log('Driving a car')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo: ' + amount)
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();
  // 2c) type guard for classes
  // if('loadCargo' in vehicle) {
  // OR better with JavaScript keyword "instanceof" to check if some obj is based on a certain class
  if(vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1);
useVehicle(v2);

// 3) Discriminated Unions: is a pattern that makes implementing type guards easier;
// define a property of a literal type (f.e. type: 'bird') that describes/determines exactly this obj
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
  let speed;
  switch (animal.type) {
    case 'bird': 
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break
  }
  console.log('Moving speed: ' + speed)
}

moveAnimal({type: 'bird', flyingSpeed: 10})

// 4) Type Casting
// helps to tell TS that some value is of a specific type where TS is not able to detect it on his own, but I as a dev know it;
// use case: selecting DOM element because TS doesn't analyse html document -> so only knows often that's an HTMLElement, 
// but not which exact type (f.e. an HTMLInputElement)
// 4a) <HTMLInputElement> to indicate that everthing AFTER is of type HTMLInputElement and so .value property is available for TS;
// TS know these element definitions because of "dom" lib in tsconfig.json
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// userInputElement.value = 'Hello';
// 4b) "as" keyword: to avoid clash to similar JSX syntax in React, this is better alternative
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = 'Hello';

// 5) Index Types
// to have flexibility that I don't need to know in advance which property names I wanna use AND how many I will need;
// example: flexible ErrorContainer to output error messages for every different form with different inputs and identifiers in my app;
// so I need obj where the value type is clear (f.e. string), but I don't know how many properties with which names I have 
interface ErrorContainer { // { email: 'Not a valid email', username: 'Not a valid username' }
  // with [] only the type of the key name is defined, but NOT the name of the key
  [key: string]: string;
  // when using index types, can add predefined key names, but it's important to always use the same value type (f.e. 'string')
  // id: string;
}

const errorMsg: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Not a valid username'
}

const fetchedUserData = {
  id: 'u1',
  name: 'Matchu',
  job: {
    title: 'CEO',
    description: 'Vegan Ice Cream App',
  }
}
// 7) Optional Chaining
// Without TS: if I fetch data and cannot know when data arrives and if data is fetched correctly, 
// then use && to dive deeper into nested objects and to check first if data exists
// console.log(fetchedUserData.job && fetchedUserData.job.title);
// With TS: use question mark (?), that means if data exists access next property;
// if data in front of ? is undefined, then it will not access the property after AND not throw a runtime error
console.log(fetchedUserData?.job?.title)

// 8) Nullish Coalescing Operator "??"
const userInput2 = null;
// ?? means, if value before is null OR undefined (Attention: NOT empty string, NOT zero), then fallback after is used
const storedData = userInput2 ?? 'DEFAULT';
console.log(storedData) 