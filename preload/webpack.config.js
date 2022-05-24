const path = require('path')
const outputPath = path.join(__dirname, '../dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = [{
  target: 'electron-renderer',
  mode: 'production',
  node: {
    __dirname: false
  },
  entry: {
    main: './plugin.js'
  },
  output: {
    path: outputPath,
    filename: 'plugin-npm.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                electron: '13.0.0'
              }
            }]
          ],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: './preload.js', to: outputPath },
        ],
      }
    ),
  ]
}]