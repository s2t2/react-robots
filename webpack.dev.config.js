var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server', // enables hot middleware
    'webpack-hot-middleware/client', // enables hot middleware
    './src/entry.js'
  ],
  output: {
    publicPath: path.resolve('/dist'), // enables browser access to dist/bundle.js
    path: path.resolve('/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ], // enables hot middleware in development
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
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        include: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },
  //resolve: {
  //  extensions: ['', '.json', '.jsx', '.js']
  //}
};
