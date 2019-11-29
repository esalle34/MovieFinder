const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: { main: './jsx/main.jsx' },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/js',
    publicPath: '/',
    filename: '[name].min.js'
  },
    plugins: [
    new MinifyPlugin({})
  ],
  devServer: {
    contentBase: './js'
  }
};