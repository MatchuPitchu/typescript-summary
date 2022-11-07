# Using JavaScript Libraries with TypeScript

- some libraries are pure JS libraries built for Vanilla JS (like e.g. lodash)
- TS doesn't understand, so TS outputs errors, even though it works technically because TS is only a superset of JS
- solution: searching for @types packages on npm (https://www.npmjs.com/) like `@types/lodash`; package helps to translate JS to TS, that means it defines types the library works with

## Helpful libraries for TypeScript

- Class Transformer: <https://github.com/typestack/class-transformer>

  - transform plain javascript object to a ES6 class that I have
  - Example: loading a json from your backend, some api or from a json file, and after you JSON.parse it you have a plain javascript object, not instance of class you have

- Class Validator: <https://github.com/typestack/class-validator>
  - helps to add validation rules with decorators inside of a class, then with each instantiation of the class I can check for these rules thanks to imported function `validate(NameOfNewObjToBeValidated)`
