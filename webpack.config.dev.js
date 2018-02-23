module.exports = {
  entry: './src/js/expose.js',
  output: {
    filename: 'excellence.js',
    libraryTarget: 'var',
    library: 'Excellence'
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
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/assets/',
    port: 3000,
    inline: true,
  }
};