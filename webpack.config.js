module.exports = {
	entry: './static/main.js',
	output: {
		path: __dirname + '/static/',
		filename: 'main.bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'postcss-loader'
				]
			}
		]
	}
}