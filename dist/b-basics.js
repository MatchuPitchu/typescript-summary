"use strict";
const add = (n1, n2, showResult, phrase) => {
    // this would be way of checking types without TS in development
    // if(typeof n1 !== 'number' || typeof n2 !== 'number') {
    //   throw new Error('Incorrect input!')
    // }
    if (showResult) {
        console.log(`${phrase} ${n1 + n2}`);
    }
    else {
        return n1 + n2;
    }
};
const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is:';
add(number1, number2, printResult, resultPhrase);
//# sourceMappingURL=b-basics.js.map