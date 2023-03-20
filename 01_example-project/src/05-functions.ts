// ":string" defines the return type of function
// BUT: it is preferable to not define this and to let TS it do automatically depending on the return
const add = (n1: number, n2: number): number => {
  return n1 + n2;
}

// void means that function has no return statement
// when I console.log(printResult(5)) than I receive undefinied
const printResult = (num: number): void => {
  console.log('Result: ', + num)
}

printResult(add(5, 12))

// declare a variable with Function Type, so that only a certain function can be stored in variable
// Here: combineValues accepts only function with 2 parameters of type number and a return of type number
let combineValues: (a: number, b: number) => number;
combineValues = add;
// combineValues = printResult; !!TS ERROR!!
console.log(combineValues(2, 2));

// Function Types and Callbacks
// void in this context means that a) no return in the cb function
// or b) anything that might be returned of the cb function will not be used -> so I 
// could write return in cb and that is not a TS error
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
})