"use strict";
const testBtn = document.getElementById('testBtn');
const clickhandler = (message) => {
    console.log('Click ' + message);
};
testBtn.addEventListener('click', clickhandler.bind(null, 'succesfull'));
//# sourceMappingURL=07-exclamation-mark.js.map