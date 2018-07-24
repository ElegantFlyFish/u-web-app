const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(env){
  return merge(common, {
    entry: {
      app: path.resolve(__dirname, '../src/index')
    },
    output: {
      filename: '[name]_[hash].js',
      path: path.resolve(__dirname, '../dist')
    },
    mode:'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ /* your config */ })
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // 提取 node_modules 中代码
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          },
          commons: {
            // async 设置提取异步代码中的公用代码
            chunks: "async",
            name: 'commons-async',
            /**
             * minSize 默认为 30000
             * 想要使代码拆分真的按照我们的设置来
             * 需要减小 minSize
             */
            minSize: 0,
            // 至少为两个 chunks 的公用代码
            minChunks: 2
          }
        }
      },
      /**
       * 对应原来的 minchunks: Infinity
       * 提取 webpack 运行时代码
       * 直接置为 true 或设置 name
       */
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins:[
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ],
    
  })
}