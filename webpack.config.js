
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename:'index.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' webpack 1 用
    }
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
    ]
  },
  plugins:[
    new VueLoaderPlugin()
  ]
}