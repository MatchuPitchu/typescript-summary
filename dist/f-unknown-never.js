"use strict";
// Type unknown
let userInput;
let userName;
userInput = 5;
userInput = 'Matchu';
// userName = userInput; !TS ERROR! because it is not sure that userInput is a string
// so in this case I have to check first typeof in order to be able to assign 
// a unknown variable to a varibale with a fixed type
if (typeof userInput === 'string') {
    userName = userInput;
}
// Type never: this functions returns not undefinied or anything, it returns
// nothing (or so called never), because error crashes this part of the script
const generateError = (message, code) => {
    throw { message: message, errorCode: code };
    // while (true) {} // infinite loop return never too
};
// const result = generateError('An error occurred: ', 500);
// console.log(result); // nothing is returned
generateError('An error occurred: ', 500);
//# sourceMappingURL=f-unknown-never.js.map