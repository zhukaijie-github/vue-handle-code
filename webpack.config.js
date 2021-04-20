const path = require('path')

module.exports = {
  entry: './src/vue.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/xuni/'
  },
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'public'),
    hot: true
  }
}

