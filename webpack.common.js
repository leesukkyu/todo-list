const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// 공통 설정
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve('babel.config.json'),
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        loader: 'url-loader',
        options: {
          outputPath: 'images/',
          name: '[hash]-[name].[ext]',
          limit: 3000,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: /(src|public)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@Store': path.resolve(__dirname, 'src/store/'),
      '@Stores': path.resolve(__dirname, 'src/store/stores/'),
      '@Src': path.resolve(__dirname, 'src/'),
      '@UI': path.resolve(__dirname, 'src/ui/'),
      '@Types': path.resolve(__dirname, 'src/@types/'),
      '@Images': path.resolve(__dirname, 'src/public/images/'),
      '@Styles': path.resolve(__dirname, 'src/public/styles/'),
      '@Components': path.resolve(__dirname, 'src/components/'),
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/public/index.html' }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
