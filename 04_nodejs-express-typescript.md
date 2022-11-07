# Node.js and Express with TypeScript

- Node.js isn't capable of parsing and compiling TypeScript -> it treats every file that is executed as JavaScript
- NOT used here, but recommanded: Nest.js is a progressive Node.js framework for building efficient, reliable and scalable server-side applications that supports heavily TS - <https://nestjs.com/>

## Setup in Visual Studio Code

- `npm init` to initialize package manager and configuration
- `tsc --init` to initialize TS configuration

  - `tsconfig.json` file setup:

  ```JavaScript
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "moduleResolution": "node", // add this to tell TS how different files and imports work together
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
  ```

- `npm i --save express body-parser` to install Express framework and body parsing middleware to be able to parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- `npm i --save-dev @types/node @types/express`-> install all type declarations to work with node.js and express
- `npm i --save-dev nodemon` -> allows to execute file with node.js and watches this file and the folder for changes to restart server in case of changes
- add script to package.json `"start": "nodemon dist/app.js"` to start dev server with compiled JS file
