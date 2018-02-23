const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/ts/expose.ts',
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'excellence.js',
    libraryTarget: 'umd',
    library: 'Excellence'
  },
  module: {
    loaders: [
    ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        dead_code: true,
      }
    })
  ]
};
