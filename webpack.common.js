const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(webp|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './home/images/[name][ext]',
        },
      },
    ],
  },
};
