const webpack = require('webpack');
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const env = process.env.NODE_ENV;

module.exports = {
	mode: env == 'production' || env == 'none' ? env : 'development',
	entry: {
		app: [path.resolve(__dirname + '/src/App.js'), path.resolve(__dirname + '/src/styles/app.scss')],
	},
	output: {
		path: path.resolve(__dirname + '/dist'),
    filename: 'assets/js/[name]-[hash].js'
	},
	devServer: {
		port: 9090,
    host: 'localhost',
    hot: true,
    progress: false,
    historyApiFallback: true,
    contentBase:'src',
    watchContentBase: false,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8000,
							name: 'assets/images/[name]-[hash].[ext]',
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name]-[hash].css'
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }]
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebPackPlugin({
			template: 'index.html',
			filename: 'index.html',
			inject: true
		}),

	]
};