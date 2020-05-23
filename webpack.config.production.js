const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { version } = require('./package.json');

// 배포용 설정
module.exports = merge(common, {
  entry: {
    entry: ['react-app-polyfill/ie11', './src/entry'],
  },
  mode: 'production',
  output: {
    path: `${__dirname}/build`,
    filename: `[name].${version}.js`,
    chunkFilename: `chunks/[name].${version}.chunks.js`,
    publicPath: './',
  },
  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //     maxInitialRequests: Infinity,
  //     minSize: 0,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           // get the name. E.g. node_modules/packageName/not/this/part.js
  //           // or node_modules/packageName
  //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

  //           // npm package names are URL-safe, but some servers don't like @ symbols
  //           return `npm.${packageName.replace('@', '')}`;
  //         },
  //       },
  //     },
  //   },
  // },
});
