"use strict";
const add = (n1, n2) => {
    return n1 + n2;
};
const printResult = (num) => {
    console.log('Result: ', +num);
};
printResult(add(5, 12));
let combineValues;
combineValues = add;
console.log(combineValues(2, 2));
const addAndHandle = (n1, n2, cb) => {
    const result = n1 + n2;
    cb(result);
};
addAndHandle(10, 20, (result) => {
    console.log(result);
});
//# sourceMappingURL=05-functions.js.map