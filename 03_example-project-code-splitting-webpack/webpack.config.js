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
