var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');  
var StyleLintPlugin = require('stylelint-webpack-plugin');               

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
          test: /\.css$/,
          loader: "style-loader!css-loader?-autoprefixer!postcss-loader"
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./style/foo.css'),
    new StyleLintPlugin()                                         
  ],  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  postcss: () => {
    return [
      require('precss'),
      require('autoprefixer')
    ];
  }
};
