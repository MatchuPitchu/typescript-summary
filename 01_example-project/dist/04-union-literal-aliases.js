"use strict";
const combine = (input1, input2, resultConversation) => {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversation === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
};
const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);
const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);
const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
let input3 = 5;
input3 = 'string';
//# sourceMappingURL=04-union-literal-aliases.js.map