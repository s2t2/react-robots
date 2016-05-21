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
      }, // enable reading of a json file required by moment-timezone

      // enable loading of twitter bootstrap fonts and stuff
      //{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      //{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      //{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      //{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}

      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  //resolve: {
  //  extensions: ['', '.json', '.jsx', '.js']
  //}
};
