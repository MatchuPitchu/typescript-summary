"use strict";
const names = ['Matchu'];
console.log(names[0].split(''));
const promise = new Promise((resolve) => {
    setTimeout(() => resolve('Promise fulfilled'), 2000);
});
promise.then(data => {
    data.split(' ');
});
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
const mergedObj = merge({ name: 'Matchu', hobbies: ['Coding'] }, { age: '30' });
const mergedObj2 = merge({ name: 'Matchu' }, { age: '30' });
console.log(mergedObj.name);
const countAndDescribe = (element) => {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element';
    }
    else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements';
    }
    return [element, descriptionText];
};
console.log(countAndDescribe(['Sports', 'Coding']));
const extractAndConvert = (obj, key) => {
    return console.log('Value: ' + obj[key]);
};
extractAndConvert({ name: 'Matchu' }, 'name');
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Matchu');
textStorage.addItem('Pitchu');
textStorage.removeItem('Matchu');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
const createCourseGoal = (title, description, date) => {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
};
const names2 = ['Matchu', 'Mio'];
//# sourceMappingURL=12-generics.js.map