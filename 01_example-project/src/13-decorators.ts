// Decorators
// set "experimentalDecorators": true in tsconfig.json to be able to use decorators;
// Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.

// 1) Decorator function
// it's a convention to start with uppercase starting letter;
// decorator to a class has 1 parameter (-> constructor), to invoke decorator function add the identifier "@" 
// and the function name (-> @Logger); decorator runs when class definition is found (NOT when class is instantiated)
// const Logger = (constructor: Function) => {
//   console.log('Logging person');
//   console.log(constructor);
// }

// 2) Working with Decorator Factories
// contrary to the above I return the decorator function, so I can call it below with @Logger(argument) and pass
// this argument to the inner decorator function
const Logger = (logString: string) => {
  return function(constructor: Function) {
    console.log('LogString: ', logString);
    console.log('Constructor: ', constructor);
  }
}

// 3) Building More Useful Decorators
// const WithTemplate = (template: string, hookId: string) => {
//   // a) Don't need constructor here; to tell this TS, I can add underscore as parameter (_)
//   // return function(_: Function) {
//   //   const hookEl = document.getElementById(hookId);
//   //   if(hookEl) {
//   //     hookEl.innerHTML = template;
//   //   }
//   // }
//   // b) Use constructor inside decorator function to have access to class properties and use them
//   return function(originalConstructor: any) {
//     const hookEl = document.getElementById(hookId);
//     const p = new originalConstructor();
//     if(hookEl) {
//       hookEl.innerHTML = template;
//       hookEl.querySelector('h1')!.textContent = p.name;
//     }
//   }
// }

// 6) Returning (and changing) a Class in a Class Decorator
// returning a new constructor function (with syntatic sugar "class extends constructor")
// which is based on the original constructor (-> I keep all properties of original class)
// I need TS Generics to tell TS that I pass a certain number of arguments into the decorator function
// AND that the return contains in every case a name property AND in constructor(..._: any[]) I use underscore
// instead of "args" to tell TS that I don't use this parameter in the function (otherwise TS complains)
const WithTemplate = (template: string, hookId: string) => {
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
    return class extends originalConstructor { 
      constructor(..._: any[]) {
        // save original class with super() AND extend this with my own logic below
        super();
        // I put the code above into the constructor so that besides the old logic of the class, this is added 
        // and always executed when a class is instantiated; so content is displayed only when class is instantiated
        const hookEl = document.getElementById(hookId);
        if(hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  }
}

// 4) Adding Multiple Decorators: 
// execution of decorator functions is bottom up;
// BUT: regarding the decorator factories, so the normal invocation with @Logger etc., they run top down
@Logger('Logging person')
@WithTemplate('<h1>My Person Object</h1>', 'decoratorId')
class Person2 {
  name = 'Matchu';

  constructor() {
    console.log('Creating person object...')
  }
}

const pers = new Person2()
console.log('Instantiated Class: ', pers)

// 5) Property decorators
// executes when class is defined;
// a) property decorators takes 2 arguments: target of the property (-> if called on an instance, 
// then it's prototype of obj that was created; -> if static property, target refers to constructor function);
// property name
const Log = (target: any, propName: string | Symbol) => {
  console.log('Property decorator: ', target, propName);
}

// b) accessor (setters, getters) decorators takes 3 arguments:
// target of the property (look above); name of accessor; descriptor with TS built-in type PropertyDescriptor
const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log('Accessor decorator: ', target, name, descriptor)
}

// c) method decorators takes 3 arguments: same as for accessor decorators
const Log3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor) => {
  console.log('Method decorator: ', target, name, descriptor)
}

// d) parameter decorators takes 3 arguments
const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log('Parameter decorator: ', target, name, position)
}

class Product {
  @Log
  title: string;
  private _price: number;
  
  @Log2
  set price(val: number) { 
    if(val > 0) this._price = val;
      else throw new Error('Invalid price - should be positive')
  }

  constructor(t: string, p: number) { 
    this.title = t;
    this._price = p;
   }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const product1 = new Product('Book', 19);
const product2 = new Product('Book 2', 29)

// 7) Other Decorator Return Types
// return inside of Decorator functions (Attention: NOT decorator factories, they return always of course) is possible
// on accessor and method decorators; can return a new PropertyDescriptor;
// I don't need target and methodName properties, so I use underscores
const Autobind = (_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  // access to the original method
  const originalMethod = descriptor.value;
  // setup a new adjusted descriptor
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    // here false means that I can't loop through this method
    enumerable: false,
    get() {
      // create autobind functionality; "this" refers to what ever is responsible for triggering the get method;
      // so "this" refers always to the object on which I define the get method (-> it's NOT overwritten by eventlisteners)
      const boundFn = originalMethod.bind(this);
      return boundFn
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button3 = document.querySelector('button')!;
// here p.showMessage logs undefined because "this.message" in the class binds this to the target of the event, 
// NOT the p object; common workaround is "p.showMessage.bind(p)" to bind "this" to the p object
button3.addEventListener('click', p.showMessage)

// 8) Data Validation with Decorators
// in real case scenario these 3 functions could be in a validation library, then I import these functions here;
// npm class-validator package is f.e. availabe here: https://www.npmjs.com/package/class-validator
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

const Require = (target: any, propName: string) => {
  // in target.constructor.name I find the course name
  registeredValidators[target.constructor.name] = {
    // take any existing key value pairs thanks to spread operator; otherwise variale would be overwritten
    ...registeredValidators[target.constructor.name],
    // naive approach to show idea of validation; in real case I should check if propName already exists and so on
    // the spread operator in array causes an error - don't have solution so far
    [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
  }
  console.log(registeredValidators[target.constructor.name]);
}

const PositiveNum = (target: any, propName: string) => {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
  }
}

const validate = (obj: any) => {
  // Idea: if this function returns true, then alert msg below is displayed
  console.log('Created Object: ', registeredValidators[obj.constructor.name]);

  // save registeredValidators obj into a const
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig) return true;

  // through the loops let isValid is updated to false if at least in 1 switch statement value "obj[prop]" is evaluated to falsy
  let isValid = true;
  // loops are only here to build switch statements inside
  // loop through the keys of the props in the saved obj
  for(const prop in objValidatorConfig) {
    // loop through the values ('required' or 'positive')
    for(const validator of objValidatorConfig[prop]) {
      // switch different cases that are stored as values
      switch(validator) {
        case 'require':
          console.log('Required Validator: ', obj[prop]);
          // return true if required exists
          // !! ensures the resulting type is a boolean (true or false)
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          console.log('Positive Validator: ', obj[prop]);
          // return true if number is greater than zero
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid
}

class Course {
  @Require
  title: string;
  @PositiveNum
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', e => {
  e.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  // + converts string into number; like parseInt()
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  // invoke data validation function
  if(!validate(createdCourse)) {
    alert('Invalid input');
    return
  }
  console.log(createdCourse);
})