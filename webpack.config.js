const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry:[
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server', 
			'react-hot-loader/patch',
			path.join(__dirname,'./app/index.js')/*var joinPath = path.join(__dirname, 'a', 'b', 'c');//D:\nodePro\fileTest\a\b\c__dirname变量值代表程序运行的根目录。*/
	],
	output: {
	    filename: 'bundle.js',
	    path: path.join(__dirname, '/dist/'),
	    publicPath:"/"
	},
	plugins: [
	    new HtmlWebpackPlugin({
    		template: './index.tpl.html',
    		inject:"body",
    		filename:'./index.html'
    	}),
    	new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin(),
	    new webpack.DefinePlugin({
	    	'process.env.NODE_ENV':JSON.stringify('development')
	    })
	],
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/node_module/,
				loader:"babel-loader",
				query:{
					presets:['react','es2015']
				}
			},
			{
				test:/\.css$/,
				loader:"style!css"
			},
			{
				test:/\.less$/,
				loader:"style-loader!css-loader!less-loader"
			}
		]
	}
}