# Practice Part of TypeScript Course

- Practice exercise based on Object Oriented Programming (OOP) and TypeScript
- Content:
  - enter new projects with a description and number of people assigned in a form
  - creation of a movable list of active and finished projects

## Splitting Code Into Multiple Files

- Option 1 (recommanded): ES6 Imports and Exports

  - Use ES6 import/export syntax
    - write in index.html: `<script type="module" src="dist/app.js"></script>`
    - set in tsconfig.json: `"target": "es6", "module": "es2015"`
  - Per-file compilation but single `<script>` import
  - Bundling via third-party tools (e.g. Wenpack) is possible

    ```TypeScript
    // Example
    // project-input file
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
      // ...
    }

    // target file that imports
    import { ProjectInput } from './components/project-input.js';

    // if you have more than one import of one file
    import { Validatable, validate } from '../util/validation.js';
    // OR group imports
    import * as Validation from '../util/validation.js';
    // now I can use all imported things like props in an obj (-> e.g. Validation.Validatable)

    // assigning alias to rename an import
    import { Autobind as BindFn } from '../decorators/autobind.js';

    // default export
    // only 1 default (= main) export per file allowed
    export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
      // ...
    }

    // import with default export
    // choose name of your choice without curly brackets, BUT recommanded is original name
    import ProjectInput from './components/project-input.js';
    // OR
    import PrjInput from './components/project-input.js';

    ```

- Option 2 (cumbersome and more error-prone way): Namespaces & File Bundling

  - Use TS "namespace" code syntax to group code
  - Per-file or bundled compilation (-> files together into one file) is possible (less imports to manage)

    ```TypeScript
    // Example:
    // activate "outFile" and write destination file path like "./dist/bundle.js" in tsconfig.json to concatenate and emit output to single file; otherwise compiled TS files with namespace DON'T work in JS world;
    // set "module": "amd" in tsconfig.json to make bundling work;
    // Create new TS file in subfolder "models/drag-drop.ts" and wrap code into a namespace NAME {}
    namespace App {
      // only need export things that I need in the outside, NOT needed for things that are only used inside the curly brackets here
      export interface Draggable {
        dragStartHandler(e: DragEvent): void;
        dragEndHandler(e: DragEvent): void;
      }

      export interface DragTarget {
        dragOverHandler(e: DragEvent): void;
        dropHandler(e: DragEvent): void;
        dragLeaveHandler(e: DragEvent): void;
      }
    }

    // Create other new TS file in subfolder "models/project.ts" and wrap code with same namespace NAME {}
    namespace App {
      export enum ProjectStatus { Active, Finished }

      export class Project {
        constructor(
          public id: string,
          public title: string,
          public description: string,
          public people: number,
          public status: ProjectStatus,
        ) {}
      }
    }

    // ... create more TS files, export what you need outside and import in main file below ...

    // ------------------------------ //
    // In the file you want to import into write in first line starting with "///", then wrap all code in app.ts (or where you wanna import code) into namespace NAME {}
    /// <reference path="models/drag-drop.ts" />
    /// <reference path="models/project.ts" />
    namespace App {
      // ... my code with some references to outsourced code above
    }

    ```

  - Option 3 (NOT recommanded): writing multiple ts files that are compiled to multiple js files and inserted in HTML Code with `<script>` Tag

### How Does Code In Modules Execute?

- exported variables (e.g. `export const projectState = ProjectState.getInstance()`) runs only once when file is imported for the first time. NOT runs more than once, even though if file is imported in multiple files

## Webpack - Bundling files together

> https://webpack.js.org/

- bundling & "Build Orechstration" Tool that helps to reduce amount of http requests by bundling code together, so less imports required
- optimizes (minifies, shortens) code, less code to download
- allows to add more build steps/tools, e.g. to help with CSS files

### "Normal" Setup

- multiple .ts files & impots (HTTP requests)
- unoptimized code (not as small as possible)
- "External" development server needed (like lite-server)

### Installing Webpack and Configuration Setup

- type into cli: `npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader`
- "--save-dev" means that the installed dependencies are only for development purposes
- in package.json:
  - `webpack`: heart of setup to bundle and transform code (e.g. compile TS to JS and then bundle files)
  - `webpack-cli`: to be able to run webpack commands
  - `webpack-dev-server`: built-in development server which watches files for changes, triggers recompilations, serves the page
  - `typescript`: in addition to the globally installed typescript package on my system, it's good practice to install copy with specific version of TS per project, so that update on global TS version wouldn't break my specific project
  - `ts-loader`: tells webpack how to convert TS to JS code
  - add in "scripts": {} a build script like `"build": "webpack"` that I can run with `npm run build`
  - if I want to use webpack-dev-server then use `"start":"webpack-dev-server"`
- in tsconfig.json:
  - `"target": "es6"` (or at least "es5")
  - `"module": "es2015"` (or "es6" which is the same)
  - `"sourceMap": true` (helps to debug the code)
  - `"outDir": "./dist"` (or where I want output files)
  - don't need rootDir any more because webpack will take over and determine where root files are
- create NEW file webpack.config.js to configure webpack

  1. remove all file extensions (.js) in all imports of project because webpack looks for extensions automatically

  ```TypeScript
  import { ProjectInput } from './components/project-input'
  ```

  2. Basic development setup for my project

  ```TypeScript
  const path = require('path'); // import core built-in node.js module 'path' that helps to build absolute pathes for folders

  module.exports = {
  mode: 'development', // building for dev purposes -> webpack will do fewer optimizations
  entry: './src/app.ts', // root entry file of project
  output: {
    filename: 'bundle.js', // output name of file; can include dynamically by webpack created hash for each bundling process -> bundle.[contenthash].js
    path: path.resolve(__dirname, 'dist'), // absolute path of outDir folder mentioned in tsconfig.json
      // needed for webpack-dev-server that changes in files are reloaded correctly on the server;
      // indicate output folder relative to index.html file
    publicPath: 'dist'
  },
  // informs webpack that I use "sourceMap": true (in tsconfig.json) and that weback should connect them correctly to the bundle it generates
  devtool: 'inline-source-map',
  // configure webpack how to work with files that it finds
  module: {
    rules: [
      {
        // describes a test webpack will perform on any file it finds;
        // uses regular expression
        test: /\.ts$/, // regex to check files with end ".ts"
        use: 'ts-loader', // every TS file should be handled by ts-loader
        exclude: /node_modules/, // regex to exclude node_modules folder
      }
    ]
  },
  resolve: {
    // webpack looks for TS and JS files as extensions of imports AND bundles these files together
    extensions: ['.ts', '.js']
  }
  };
  ```

- create NEW file webpack.config.prod.js to configure production setup

  - install `npm i --save-dev clean-webpack-plugin` that can delete files in a folder before rebuilding the project
  - in package.json: change to `"build":"webpack --config webpack.config.prod.js"`

  ```TypeScript
  const path = require('path');
  const CleanPlugin = require('clean-webpack-plugin')

  module.exports = {
    mode: 'production', // production mode
    entry: './src/app.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    // extra extentions which will apply to entire output;
    // difference to module: [...] -> that's applied on a per file level
    plugins: [
      // delete files in output folder (here: dist) before rebuilding new bundled file;
      // instantiate imported plugin above
      new CleanPlugin.CleanWebpackPlugin()
    ]
  };
  ```
