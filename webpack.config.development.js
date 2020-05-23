const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// 개발용 설정
module.exports = merge(common, {
  entry: {
    entry: ['react-app-polyfill/ie11', './src/entry'],
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'source-map',
});
