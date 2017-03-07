var webpack = require('webpack')
var rupture = require('rupture')
var poststylus = require('poststylus')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: [path.resolve(__dirname, 'src/js/main')],
  output: {
    path: path.resolve(__dirname),
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname
  },
  watch: true,
  module: {
    loaders : [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [
            rupture(),
            poststylus([
              'autoprefixer',
              'lost'
            ])
          ]
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new WriteFilePlugin()
  ]
}