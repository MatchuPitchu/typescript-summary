// Review Next-generation JavaScript

// 1) const, let, var
const userName2 = 'Matchu';
// userName2 = 'Matchu'; // runtime error

// Example for scope of variables
// var is NOT recommanded to use any more
// var is only available in the scope of this function when declared inside the function
// when declared outside, it is available globally
// var only knows scope of function and global
const add3 = (a: number, b: number) => {
  var result;
  result = a + b;
  return result
}
// This would not work when var declared inside the function
// console.log(result)

// With let JS introduces new block scope (= a snipet surrounded with curly braces)
let age = 30;

if (age > 20) {
  // let is only available inside the curly braces
  let isOld = true;
  console.log(isOld);
}
// This would not work
// console.log(isOld)

// 2) Arrow functions with function type and as an anonymous function for a event handler
const printOutput: (a: number | string ) => void = output => console.log(output);
printOutput(add3(5, 2));

const button2 = document.querySelector('button');
if(button2) {
  button2.addEventListener('click', event => console.log(event))
}

// 3) Setting a default function parameter
// if function is called without second argument then second parameter will be the defined default parameter 
const add4 = (a: number, b: number = 10) => a + b;
printOutput(add4(5));

// 4) Spread Operator (...) in Arrays and Objects
const hobbies = ['Sports', 'Music'];
const activeHobbies = ['Hiking'];
// This is NOT a convenient way because there you have to write every item to add to another array
// activeHobbies.push(hobbies[0], hobbies[1])

// Better with spread operator
activeHobbies.push(...hobbies);
console.log(activeHobbies)

const activeHobbies2 = ['Hiking', ...hobbies]
console.log(activeHobbies2)

const person2 = {
  name: 'Matchu',
  age: 36
};
// This assignment is only coping the pointer at this person2 obj in memory
// into this copiedPerson constant (look at: https://academind.com/learn/javascript/reference-vs-primitive-values/ )
const copiedPerson = person2;
// With spread operator a do a copy
const copiedPerson2 = { ...person2 };

// 5) Rest Parameter as Function Parameter: Feature to accept an unlimited amount of arguments
// ...numbers (or name of my choice) is a merged array that includes a list a incoming values (= all arguments)
const add5 = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0)
};

const addedNumbers = add5(5, 10, 2, 4, 8.5);
console.log(addedNumbers);

// 6) Array & Object Destructuring
// Array: destructuring is working by order of the array list
// item1 and item2 of array is saved in constants hobby1 and hobby2
// if array has more items, then these are copied in new array remainingHobbies
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

// Object: destructuring is working by keys (property names)
// if key exists already as a variable then with ":" I rename it (give an alias)
const { name: firstName, age: agePerson } = person2