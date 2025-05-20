const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //entry: './js/main.js',
  entry: {
    app: './js/main.js',  //app.bundle.js
    ratefinder: './js/ratefinder.js'  //ratefinder.bundle.js
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ] //rules
  }, //module
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['app']
        })
  ], //plugins
  stats: {
    colors: true
  },
  devServer: {
    port: 9000,
    open: true,
    hot: false,
    liveReload: true,
  },
  devtool: 'source-map',
  mode: 'development'
};