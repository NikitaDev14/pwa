const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, 'src/ts/main/main.ts'),
    serviceWorker: path.join(__dirname, 'src/ts/service worker/main.ts'),
  },
  devtool: 'inline-source-map',
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    https: true,
    liveReload: true,
    watchContentBase: true,
    useLocalIp: true,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
        'css-loader',
      ],
    }, {
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.js', '.ts', '.css'],
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        '!favicon.ico',
        '!manifest.json',
        '!index.html',
        '!help/**',
        '!images/**'
      ]
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/**'),
        to: path.resolve(__dirname, 'dist'),
        context: 'src/',
        ignore: ['*.ts'],
      },
    ]),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};