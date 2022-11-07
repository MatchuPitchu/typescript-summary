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