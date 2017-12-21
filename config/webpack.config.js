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
    loaders: [
      {
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../src'),
        test: /\.js$/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
