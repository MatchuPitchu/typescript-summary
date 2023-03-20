// using of union types - that means more than one data type for a variable or a function parameter; 
// sometimes than it is necessary to use conditions with typeof inside of function
// to ensure for which type this part of function is executed
const combine = (
  input1: number | string, 
  input2: number | string, 
  // resultConversation: string
  // instead of saying only that is a string, I can combine union and literal type, 
  // so that only these both are allowed and if I wanna use other than TS gives error
  resultConversation: 'as-number' | 'as-text'
) => {
  // let declaration here because of block scoping, so that variable is valid for whole function
  let result;
  if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversation === 'as-number') {
    // + means convertion to number
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  
  // if(resultConversation === 'as-number') {
  //   // + means convertion to number
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number')
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text')
console.log(combinedNames);

// Type Alias - can store any type setup like union or literal type(s) in a custom named type
// that I can use everywhere in my code
type Combinable = number | string;
let input3: Combinable = 5;
input3 = 'string'

type ConversionDescriptor = 'as-number' | 'as-text';
