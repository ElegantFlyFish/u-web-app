const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ClearWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  module:{

  },
  plugins:[
    /**
     * 插件貌似有bug 不可删除上一级的文件夹
    */
    //new ClearWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title:'U SPA -'
    }),
    
  ]
}