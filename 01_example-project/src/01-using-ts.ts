const button = document.querySelector("button")!;
// ! says that this will always find an element AND which will be an HTMLInputElement (called Typecasting)
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

// specifing the type of variable
const add1 = (num1: number, num2: number) => {
  return num1 + num2;
}

button.addEventListener("click", () => {
  // + converts value (is always string in input) to number
  console.log(add1(+input1.value, +input2.value));
});