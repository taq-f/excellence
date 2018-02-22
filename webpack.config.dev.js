module.exports = {
  entry: './src/js/app.js',
  output: {
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
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/assets/',
    port: 3000,
    inline: true,
  }
};