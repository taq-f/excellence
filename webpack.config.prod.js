const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        dead_code: true,
      }
    })]
};