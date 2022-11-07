// 3rd Party Libraries with TypeScript

// a) lodash is JS library built for Vanilla JS; TS doesn't understand, so TS outputs error
// solution: installing npm package of @types/lodash -> translates JS to TS, defines types library works with
import _ from 'lodash';
console.log(_.shuffle([1, 2, 3]));

// b) Class Transformer
// package works well with TypeScript, but doesn't use TypeScript particular feature, 
// BUT works also with Vanilla JS 
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import { Product } from './product.model';

// instantiate new object based on Product2 class
const p1 = new Product('A Book', 12.99);
console.log(p1.getInformation());

// imagine this below is fetched data;
const products = [
  {title: 'Book 1', price: 29.99},
  {title: 'Book 2', price: 19.99},
]
// problem: how to transform data above to instances of my model (-> class obj Product2)
// solution 1: manually transformat data using map method
// const loadedProducts = products.map(prod => new Product2(prod.title, prod.price))

// solution 2: npm package class transformer (explaination: https://github.com/typestack/class-transformer)
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// c) Class Validator
// thanks to imported decorators in product.model.ts, I can validate new instances of class
// here with imported validate function that returns a promise which might yield validation errors
import { validate } from 'class-validator';

const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
  // if errors array exists because of there are errors
  if(errors.length > 0) {
    console.log('Validation erorrs', errors)
  } else {
    console.log(newProd.getInformation());
  }
});