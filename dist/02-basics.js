"use strict";
const add2 = (n1, n2, showResult, phrase) => {
    if (showResult) {
        console.log(`${phrase} ${n1 + n2}`);
        return;
    }
    else {
        return n1 + n2;
    }
};
const number1 = 5;
const number2 = 2.8;
const showResult = true;
const resultPhrase = 'Result is:';
add2(number1, number2, showResult, resultPhrase);
//# sourceMappingURL=02-basics.js.map