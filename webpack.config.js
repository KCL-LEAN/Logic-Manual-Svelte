const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const CopyPlugin = require('copy-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'development';
var HtmlWebpackPlugin = require('html-webpack-plugin');


  const babelOptions = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'], //'@babel/preset-react',
  };


module.exports = {
	entry: {
		'build/bundle': ['./src/main.ts']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte/src/runtime')
		},
		extensions: ['.mjs', '.js', '.ts', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
		conditionNames: ['svelte', 'browser']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
						preprocess: sveltePreprocess({ sourceMap: !prod })
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	mode, // just deleted a whole lot of deps here
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		}),
    new HtmlWebpackPlugin()
    ],
    devtool: prod ? false : 'source-map',
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'public'),
        }
    }
};
