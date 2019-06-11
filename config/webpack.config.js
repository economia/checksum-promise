const path = require('path')

module.exports = {
  context: __dirname,
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'checksum-promise.js',
    publicPath: '/',
    library: 'checksum-promise',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        test: /\.js$/,
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
