'use strict';

const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './static/main.js',
	output: {
		path: __dirname + '/static/dist/',
		filename: 'main.bundle.js',
	},

	module: {
		loaders: [
			{
				test: /\.(s)?css/,
				loader: 'style-loader!css-loader!postcss-loader!sass-loader',
				exclude: __dirname + '/static/css/bootstrap.min.css'
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},

	plugins: [
		// new CleanWebpackPlugin('dist'),
		// new webpack.NoEmitOnErrorsPlugin(),
		// new HtmlPlugin({
		// 	filename: 'index.html',
		// 	template: path.resolve(__dirname, 'static/index.html')
		// }),
		// new ExtractTextPlugin(path.join('dist', 'lala.css')),
		// new CopyWebpackPlugin([
			// { from: 'public/sw.js' },
		// ], {
		// 	copyUnmodified: true
		// })
	]
}