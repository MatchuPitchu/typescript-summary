"use strict";
let userInput;
let userName;
userInput = 5;
userInput = 'Matchu';
if (typeof userInput === 'string') {
    userName = userInput;
}
const generateError = (message, code) => {
    throw { message: message, errorCode: code };
};
generateError('An error occurred: ', 500);
//# sourceMappingURL=06-unknown-never.js.map