const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ClearWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
    /**
     * 插件貌似有bug 不可删除上一级的文件夹
     * 使用rm -rf dist替代
    */
    //new ClearWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'U SPA',
      filename: 'index.html',
      ///template: path.parse(__dirname, '../src/index.ejs'),
    }),
    
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias:{

    // }
  }
}