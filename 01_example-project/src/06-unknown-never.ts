// Type unknown
let userInput: unknown;
let userName: string

userInput = 5;
userInput = 'Matchu';
  // userName = userInput -> TS ERROR! because it is not sure that userInput is string;
  // first: check typeof to be able to assign unknown variable to varibale with fixed type
if(typeof userInput === 'string') {
  userName = userInput;
}

// Type never: this functions returns not undefinied or anything, it returns
// nothing (or so called never), because error crashes this part of the script
const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
  // while (true) {} // infinite loop return never too
}

// const result = generateError('An error occurred: ', 500);
// console.log(result); // nothing is returned
generateError('An error occurred: ', 500);