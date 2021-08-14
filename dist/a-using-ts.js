"use strict";
const button = document.querySelector("button");
// ! says that this will always find an element AND which will be an HTMLInputElement (called Typecasting)
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");
// specifing the type of variable
const add = (num1, num2) => {
    return num1 + num2;
};
button.addEventListener("click", () => {
    // + converts value (is always string in input) to number
    console.log(add(+input1.value, +input2.value));
});
//# sourceMappingURL=a-using-ts.js.map