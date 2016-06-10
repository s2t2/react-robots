var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/entry.js',
  output: {
    publicPath: path.resolve('/dist'), // enables browser access to dist/bundle.js
    path: path.resolve('./dist'), // creates a file in this directory
    filename: 'bundle.js', // creates a file with this name
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {test: /\.css$/, loader: "style-loader!css-loader"},
      // enable reading of a json file required by moment-timezone
      {include: /\.json$/, loaders: ['json-loader']},
      // enable loading of twitter bootstrap fonts and stuff
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  }
};
