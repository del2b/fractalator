const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'pub'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},	
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: 'src/index.html', }),
		new CopyWebpackPlugin({ patterns: [{from:'static'}]}),
	],
};
