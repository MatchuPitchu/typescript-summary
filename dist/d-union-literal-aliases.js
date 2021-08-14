"use strict";
// using of union types - that means more than one data type for a variable or a function parameter; 
// sometimes than it is necessary to use conditions with typeof inside of function
// to ensure for which type this part of function is executed
const combine = (input1, input2, 
// resultConversation: string
// instead of saying only that is a string, I can combine union and literal type, 
// so that only these both are allowed and if I wanna use other than TS gives error
resultConversation) => {
    // let declaration here because of block scoping, so that variable is valid for whole function
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversation === 'as-number') {
        // + means convertion to number
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // if(resultConversation === 'as-number') {
    //   // + means convertion to number
    //   return +result;
    // } else {
    //   return result.toString();
    // }
};
const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);
const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);
const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
let input3 = 5;
input3 = 'string';
//# sourceMappingURL=d-union-literal-aliases.js.map