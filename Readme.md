# Video Tutorial

- https://www.youtube.com/watch?v=BwuLxPH8IDs

# Official TypeScript Website

- https://www.typescriptlang.org/

# Useful Commands for CLI and Compiling

- to automate reloading live server site when I change + compile file:
  1. type in => CLI "npm init" (to be able to install usefull third party packages)
  1. npm i --save-dev lite-server ("--save-dev" to mark it at a development only tool - in package.json writen under devDependencies -, that helps during dev phase; lite-server is smth like "nodemon")
  1. add in package.json in "scripts": { "start": "lite-server" }
- Compile 1 file with Command: to compile a file, use "tsc app.ts" in the CLI; than in case all compiling errors are shown in the console
- Watch 1 file to Compile after every saved change: use watch node to let compile a file always when file is changed: "tsc app.ts --watch" or "tsc app.ts -w"
- Compile entire project: first "tsc --init" to initialize a TS managed project; creates tsconfig.json file; than type only "tsc" or "tsc -w" in CLI to compile every ts file or to watch all changes
- tsconfig.json: can exclude files from being compiled or include files (than have to list all(!) files or folders that should be compiled), after "compilerOptions": { }; when add "exclude" and "include" than compilation is included files/folders minus excluded files/-folders

```JSON
  "compilerOptions": {
    "sourceMap": true, // app.js.map files are created while compilation; so in browser in source area I can see ts code for better debugging
    "outDir": "./dist", // output of compiled ts files (so js files) is found in this folder; also folder structure is replicated automatically
    "rootDir": "./src", // TS only checks this folder to compile files and would replicate this folder structure (with all subfolders) --> without defining this, TS compiles every ts file found in project and replicates all found structure in outDir folder
    "removeComments": true, // to make output js files smaller
    "noEmitOnError": false, // default is false; so TS creates js files even if there is an error; if set to true, than no file is emitted if any file fails to compile

  }
  "exclude": [
    "node_modules", // if I exclude no other files, than "node_modules" is by default excluded; when I add other exclusions, than I have to list "node_modules" to exclude all files inside node_modules folder
    "a-using-ts.ts",
    "*.ts", // * equal wildcard, now all files with ending .ts are excluded
    "**/*.ts" // * now every file with ending .ts in every order is excluded
  ],
  "include": [
    "app.ts", // file name
    "components" // folder
  ]
```

# Core Types in TypeScript

TypeScript's type system only helps during development (i.e. before the code gets compiled)

- number: no differentiation btw integers, floats ...: 1, 5.3, -10 is possible
- string: 'T', "T", `T`
- boolean: true, false (attention: no "truthy" or "falsy" values)
- object: { age: 30 }
- array: [1, 2, 3]
- Tuple: [1, 2] - fixed-length array; definition would be i.e. role: [number, string]
- Enum: enum { NEW, OLD } - only exists in TS, not in JS; automatically enumerated global constant identifiers; so when I need identifiers that are human readable

```JavaScript
enum Role { ADMIN, READ_ONLY, AUTHOR };
```

- any: \* - any kind of value, no specific type assignment; avoid it because it gives away all advantages of TS
- unknown: is the type-safe counterpart of any. Anything is assignable to unknown, but unknown isn't assignable to anything but itself and any without a type assertion or a control flow based narrowing (siehe example in coding file)
- void: void can be declared as the return type of a function, that means that function has no return statement; example:

```JavaScript
function add(num: number): void { console.log(num)};
```

- never Type: indicates the values that will never occur. The never type is used when you are sure that something is never going to occur. For example, you write a function which will not return to its end point or always throws an exception. example:

```JavaScript
const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
}
```

- union types: defining more than one data type for a variable or a function parameter
- literal types: There are three sets of literal types available in TS: strings, numbers, and booleans; by using literal types you can allow an exact value which a string, number, or boolean must have
- Type Alias: can store types like union or literal type(s) in a custom named type that I can use everywhere in my code; Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you'd otherwise have to write by hand. ... Aliasing doesn't actually create a new type - it creates a new name to refer to that type.

- Function Return Types: define the return type of a function; example:

```JavaScript
function add(num: number): number { }
```

- Function Types: define type(s) of parameters of function and type of return of function; so only function which fulfills types can be stored in a variable; example: ,

```JavaScript
let combineValues: (a: number, b: number) => number
```

- Function Types and Callbacks: define in parameters of a function the type of a callback function; example:

```JavaScript
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  cb(result);
}
```

- ! - tells TS that I know that testBtn exists and that this is not null

```JavaScript
const testBtn = document.getElementById('testBtn')!;
```
