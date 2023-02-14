// ! tells TS that I know that testBtn exists and that this is not null
const testBtn = document.getElementById('testBtn')!;

const clickhandler = (message: string) => {
  console.log('Click ' + message)
}

testBtn.addEventListener('click', clickhandler.bind(null, 'succesfull'));
