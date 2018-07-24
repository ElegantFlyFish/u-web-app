const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = function(env){
  return merge(common, {
    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: 'raw-loader'
        }
      ]
    },
    entry: {
      app: path.resolve(__dirname, '../src/index')
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist')
    },
    devtool: 'inline-source-map',
    devServer:{
      contentBase: path.resolve(__dirname, '../dist'),
      hot:true,
      compress: true,
      host: '0.0.0.0',
      port: 9000
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
    mode:'none'
  })
};