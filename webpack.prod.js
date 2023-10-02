const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: './home/built/scripts/[name].built.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // assetModuleFilename: './fonts/[name][ext]',
    environment: {
      arrowFunction: false,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './home/built/styles/[name].built.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './fonts/Nunito-Sans-Condense/[name][ext]',
        },
      },
      {
        test: /\.css|s[ac]ss$/i,
        // test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          'css-loader', //2. Turns css into commonjs
          'sass-loader', //1. Turns sass into css
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/template.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          // removeAttributeQuotes: true,
        },
      }),
    ],
  },
});
