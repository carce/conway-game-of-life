const webpack = require('webpack')

module.exports = {
    entry: './browser.js',
    output: {
      filename: './dist/bundle.js'
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        IS_3D: false
      })
    ]
  };