const path = require('path')
const webpack = require('webpack')

function getPlugins() {
  const plugins = []

  const localPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

  const productionPlugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ]

  // if (!config.util.getEnv('NODE_ENV')) {
  //   return plugins.concat(localPlugins)
  // }
  //
  // if (config.util.getEnv('NODE_ENV') === 'production') {
  //   return plugins.concat(productionPlugins)
  // }

  return plugins
}

module.exports = {
  context: __dirname,
  plugins: getPlugins(),
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'app.js',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'checksum-promise'
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
