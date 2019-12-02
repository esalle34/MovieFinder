const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: { main: './jsx/main.jsx' },
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    { 
      test: /\.css$/, 
      loader: "style-loader!css-loader" 
    },
    {  test: /\.(ttf|eot|svg|gif|png|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
     use: [{
       loader: 'file-loader'
     }]}
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
  devServer: {
    contentBase: './js'
  }
};