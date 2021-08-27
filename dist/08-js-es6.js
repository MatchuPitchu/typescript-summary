"use strict";
const userName2 = 'Matchu';
const add3 = (a, b) => {
    var result;
    result = a + b;
    return result;
};
let age = 30;
if (age > 20) {
    let isOld = true;
    console.log(isOld);
}
const printOutput = output => console.log(output);
printOutput(add3(5, 2));
const button2 = document.querySelector('button');
if (button2) {
    button2.addEventListener('click', event => console.log(event));
}
const add4 = (a, b = 10) => a + b;
printOutput(add4(5));
const hobbies = ['Sports', 'Music'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
console.log(activeHobbies);
const activeHobbies2 = ['Hiking', ...hobbies];
console.log(activeHobbies2);
const person2 = {
    name: 'Matchu',
    age: 36
};
const copiedPerson = person2;
const copiedPerson2 = Object.assign({}, person2);
const add5 = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add5(5, 10, 2, 4, 8.5);
console.log(addedNumbers);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
const { name: firstName, age: agePerson } = person2;
//# sourceMappingURL=08-js-es6.js.map