module.exports = {
  entry: './src/ts/expose.ts',
  output: {
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
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/assets/',
    port: 3000,
    inline: true,
  }
};