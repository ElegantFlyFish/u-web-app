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
      title: 'u-web-app',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/template.ejs'), 
      inject: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}