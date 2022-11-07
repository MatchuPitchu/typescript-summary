// Interfaces
// pure development feature of TS to improve the code -> no traces of this in the compiled JS code;
// interfaces describes how an obj looks like (-> it's like a custom type to type check an obj later)

interface Human {
  // properties
  // 2) "readonly" is possible here, that this property in what ever obj built based on this interface
  // must only be set once AND is only read after (-> cannot be changed after)
  readonly name: string;
  age: number;
  // methods
  greet(phrase: string): void;
}

let user1: Human;
user1 = {
  name: 'Matchu',
  age: 36,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name)
  }
}
user1.greet('Hi, here is')

// 1) Using Interfaces with Classes: to share the structure of functionalities among different classes -> to enforce that 
// the property and function structure is at least inside a certain class, but of course more can also be added in the respective class;
// use keyword "implements" to adhere one or multiple interfaces to a class;  
interface Named {
  // 5a) Optional Parameters & Properties: use question mark to tell TS that property might exist BUT it doesn't have to
  readonly name?: string;
  outputName?: string;
}

// 3) Extending Interfaces: Combine interfaces with "extends" like for classes;
// can extend with more than one interface with comma separation
interface Greetable extends Named {
  greet(phrase: string): void;
}

interface AnotherInterface { 
  // wished structure
}

// 2) Can implement also more than one interface
class Person implements Greetable, AnotherInterface {
  // 5b) name is optional (look above in interface) 
  name?: string;
  age = 36;
  // 5c) parameter in constructore is optional (look above in interface); if no argument passed, 
  // then default is undefined, otherwise can set default value (n: string = 'Mustermann')
  constructor(n?: string) {
    if(n) this.name = n;
  }

  greet(phrase: string) {
    if(this.name) console.log(phrase + ' ' + this.name);
      else console.log('Hey')
  }
}

const user2 = new Person('Pitchu');
user2.greet('Holà')

// 4) Interfaces as an alternative to Function Types:
// Function type definition: type AddFn = (a: number, b: number) => number;
// Interface definition with anonymous function
interface AddFn {
  (a: number, b: number): number;
}
let add6: AddFn;
add6 = (n1: number, n2: number) => {
  return n1 + n2;
}