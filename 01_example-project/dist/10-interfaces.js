"use strict";
let user1;
user1 = {
    name: 'Matchu',
    age: 36,
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
user1.greet('Hi, here is');
class Person {
    constructor(n) {
        this.age = 36;
        if (n)
            this.name = n;
    }
    greet(phrase) {
        if (this.name)
            console.log(phrase + ' ' + this.name);
        else
            console.log('Hey');
    }
}
const user2 = new Person('Pitchu');
user2.greet('Holà');
let add6;
add6 = (n1, n2) => {
    return n1 + n2;
};
//# sourceMappingURL=10-interfaces.js.map