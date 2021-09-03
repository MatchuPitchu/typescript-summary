"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const Logger = (logString) => {
    return function (constructor) {
        console.log('LogString: ', logString);
        console.log('Constructor: ', constructor);
    };
};
const WithTemplate = (template, hookId) => {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
};
let Person2 = class Person2 {
    constructor() {
        this.name = 'Matchu';
        console.log('Creating person object...');
    }
};
Person2 = __decorate([
    Logger('Logging person'),
    WithTemplate('<h1>My Person Object</h1>', 'decoratorId')
], Person2);
const pers = new Person2();
console.log('Instantiated Class: ', pers);
const Log = (target, propName) => {
    console.log('Property decorator: ', target, propName);
};
const Log2 = (target, name, descriptor) => {
    console.log('Accessor decorator: ', target, name, descriptor);
};
const Log3 = (target, name, descriptor) => {
    console.log('Method decorator: ', target, name, descriptor);
};
const Log4 = (target, name, position) => {
    console.log('Parameter decorator: ', target, name, position);
};
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0)
            this._price = val;
        else
            throw new Error('Invalid price - should be positive');
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const product1 = new Product('Book', 19);
const product2 = new Product('Book 2', 29);
const Autobind = (_, _2, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
};
class Printer {
    constructor() {
        this.message = 'This works';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button3 = document.querySelector('button');
button3.addEventListener('click', p.showMessage);
const registeredValidators = {};
const Require = (target, propName) => {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...registeredValidators[target.constructor.name][propName], 'required'] });
    console.log(registeredValidators[target.constructor.name]);
};
const PositiveNum = (target, propName) => {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...registeredValidators[target.constructor.name][propName], 'positive'] });
};
const validate = (obj) => {
    console.log('Created Object: ', registeredValidators[obj.constructor.name]);
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig)
        return true;
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'require':
                    console.log('Required Validator: ', obj[prop]);
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    console.log('Positive Validator: ', obj[prop]);
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
};
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Require
], Course.prototype, "title", void 0);
__decorate([
    PositiveNum
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', e => {
    e.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=13-decorators.js.map