const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].built.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'home/images/[name][ext]',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    compress: true,
    hot: true,
    open: true,
    historyApiFallback: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css|s[ac]ss$/i,
        use: [
          'style-loader', //3. Inject styles into DOM
          'css-loader', //2. Turns css into commonjs
          'sass-loader', //1. Turns sass into css
        ],
      },
    ],
  },
  // optimization: {
  //   runtimeChunk: 'single',
  // },
});
