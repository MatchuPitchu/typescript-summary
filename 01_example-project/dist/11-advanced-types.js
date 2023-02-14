"use strict";
var _a;
const e1 = {
    name: 'Matchu',
    privileges: ['create-server', 'delete database'],
    startDate: new Date(),
};
function add7(a, b) {
    if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString();
    return a + b;
}
const result = add7('Matchu', 'Pitchu');
result.split(' ');
const printEmployeeInformation = (emp) => {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
};
printEmployeeInformation(e1);
class Car {
    drive() {
        console.log('Driving a car');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck');
    }
    loadCargo(amount) {
        console.log('Loading cargo: ' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};
useVehicle(v1);
useVehicle(v2);
const moveAnimal = (animal) => {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving speed: ' + speed);
};
moveAnimal({ type: 'bird', flyingSpeed: 10 });
const userInputElement = document.getElementById('user-input');
userInputElement.value = 'Hello';
const errorMsg = {
    email: 'Not a valid email',
    username: 'Not a valid username'
};
const fetchedUserData = {
    id: 'u1',
    name: 'Matchu',
    job: {
        title: 'CEO',
        description: 'Vegan Ice Cream App',
    }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput2 = null;
const storedData = userInput2 !== null && userInput2 !== void 0 ? userInput2 : 'DEFAULT';
console.log(storedData);
//# sourceMappingURL=11-advanced-types.js.map