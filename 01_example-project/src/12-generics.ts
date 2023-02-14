// Generics
// gives flexibility: regarding the values I pass in a function or I use in a class
// combined with type safety: I get full type support what I do with the class or the result of a generic function

// 1) Built-in Generics: are main types (like Array, Object, Promise ...) that allow a variety of data types 
// rather than a single data type; generic type parameter is specified in angle brackets 
// after the name of a type; a certain type (here Array) work better with additional information about 
// the type(s) of data that's provided in this type (Array)
const names: Array<string> = ['Matchu'] // Array<string> is identical to string[]
// now I can call all string methods and TS doesn't complain
console.log(names[0].split(''));

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => resolve('Promise fulfilled'), 2000);
});

// thanks to generic type parameter TS provides information f.e. which methods I can use on resolved data
promise.then(data => {
  data.split(' ');
})

// 2) Creating a Generic Function
// T, U and so on in alphabetical order is a convention; thanks to this generic definition TS infers dynamically the 
// types of the arguments used in the function AND TS knows that return of function is the intersection of T & U;
// in example below I indicate with T and U that object parameters are of different types, because only "objA: object, objB: object"
// is too unspecific
// 3) Working with Constraints
// restrict the types of generic types (f.e. T and U) with "extends" keyword and then set every type (also my own created types) that I want;
// in example below T and U have to be objects
const merge = <T extends object, U extends object>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Matchu', hobbies: ['Coding']}, {age: '30'});
const mergedObj2 = merge({name: 'Matchu'}, {age: '30'});
console.log(mergedObj.name);


// 4)  Another Generic Function
// Generics are flexible for me, because I don't care of the exact type of T; 
// it matters only that the element has a length property
interface Lenghty {
  length: number
}

// use interface to indicate TS that every element has length property;
// precise the return of this function as a Tuple
const countAndDescribe = <T extends Lenghty>(element: T): [T, string] => {
  let descriptionText = 'Got no value';
  if(element.length === 1) {
    descriptionText = 'Got 1 element'
  } else if(element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements';
  }
  return [element, descriptionText]
}

console.log(countAndDescribe(['Sports', 'Coding']))

// 5) The "keyof" Constraint: use keyword "keyof" to ensure that key exists in object
const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return console.log('Value: ' + obj[key]);
}

extractAndConvert({name: 'Matchu'}, 'name')

// 6) Generic Classes
// use generic type T and use it for property "data" that this will be and Array (-> T[])
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data];
  }
}

// thanks to generic types I've flexibility to define const based on class with my wished type thanks to Type Casting;
// nevertheless of flexibility, I've full TS support to help me
const textStorage = new DataStorage<string>();
textStorage.addItem('Matchu');
textStorage.addItem('Pitchu');
textStorage.removeItem('Matchu');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// Problem in class when I work with non-primitive values (-> reference values like obj, arr);
// {name: 'Matchu'} and some lines later {name: 'Matchu'} aren't the same obj,
// so in class this.data.indexOf(item) finds nothing and returns -1 and so splice() removes 1 item of the end of array; 
// solution 1: create obj and insert it in both class methods (-> now same reference)
// solution 2: allow only primitive values in class, so extends generic type T with string, number, boolean
// const objStorage = new DataStorage<object>();
// const matchuObj = {name: 'Matchu'};
// // objStorage.addItem({name: 'Matchu'});
// objStorage.addItem(matchuObj);
// objStorage.addItem({name: 'Pitchu'});
// // ... 
// // objStorage.removeItem({name: 'Matchu'});
// objStorage.removeItem(matchuObj);
// console.log(objStorage.getItems());

// 7) Generic Utility Types
// handy built-in utility types: https://www.typescriptlang.org/docs/handbook/utility-types.html
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}
// 7a) Partial Type: wraps my own created type / interface and sets all properties as optional; 
// tells TS that in the end the courseGoal variable will be a CourseGoal with all props
const createCourseGoal = (title: string, description: string, date: Date) => {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal;
}

// 7b) Readonly Type: cannot manipulate variable, obj, array after creation
const names2: Readonly<string[]> = ['Matchu', 'Mio'];
// names2.push('Pitchu'); // TS complains
// names2.pop(); // TS complains

// 8) Generic Types vs Union Types
// Union types: defines f.e. in case of "(string | number | boolean)[]" that I'm free to use all these types for items of array
// Generic Types: defines dynamically a type f.e. depending on inserted argument type, 
// BUT then locks in this type for entire function or class (-> f.e. string is set internally)