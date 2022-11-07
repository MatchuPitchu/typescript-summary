const add2 = (n1: number, n2: number, showResult: boolean, phrase: string) => {
  // this would be way of checking types without TS in development
  // if(typeof n1 !== 'number' || typeof n2 !== 'number') {
  //   throw new Error('Incorrect input!')
  // }
  if(showResult) {
    console.log(`${phrase} ${n1 + n2}`);
    return
  } else {
    return n1 + n2;
  }
}

const number1 = 5;
const number2 = 2.8;
const showResult = true;
const resultPhrase = 'Result is:';

add2(number1, number2, showResult, resultPhrase);