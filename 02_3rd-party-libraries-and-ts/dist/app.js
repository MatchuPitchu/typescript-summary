"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
console.log(lodash_1.default.shuffle([1, 2, 3]));
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const product_model_1 = require("./product.model");
const p1 = new product_model_1.Product('A Book', 12.99);
console.log(p1.getInformation());
const products = [
    { title: 'Book 1', price: 29.99 },
    { title: 'Book 2', price: 19.99 },
];
const loadedProducts = class_transformer_1.plainToClass(product_model_1.Product, products);
for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}
const class_validator_1 = require("class-validator");
const newProd = new product_model_1.Product('', -5.99);
class_validator_1.validate(newProd).then(errors => {
    if (errors.length > 0) {
        console.log('Validation erorrs', errors);
    }
    else {
        console.log(newProd.getInformation());
    }
});
//# sourceMappingURL=app.js.map