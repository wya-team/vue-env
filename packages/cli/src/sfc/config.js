const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = path;
const cwd = process.cwd();

const BASIC_NMS = [
	resolve(__dirname, '../node_modules'),
	resolve(cwd, './node_modules'),
	resolve(cwd, '../../node_modules')
];
const NMS = [
	...BASIC_NMS,
	// 增加编译速度
	...module.paths
];

const resolvePackage = (source) => {
	let $path = NMS.find(i => fs.pathExistsSync(resolve(i, source)));

	if (!$path) {
		throw new Error(`@wya/doc: 未找到${source}`);
	}

	return resolve($path, source);
};
const resolveClient = (source) => {
	return resolve(__dirname, '../client', source || '');
};

class Config {
	constructor(type, parent) {

		this.$parent = parent;

		this.result = type === 'webpack' || type === true
			? this.generateDefault()
			: this.generateServer();
	}

	/**
	 * 针对@wya/vc有做特殊处理
	 */
	generateDefault() {
		const { webpackAssist, tempDir } = this.$parent.$parent;
		const { port, host } = this.$parent;
		const { entry, htmls, openPage } = webpackAssist;

		const exclude = new RegExp(`(${BASIC_NMS.join('|')})`);

		let origin = `http://${host}:${port}`;
		let messages = [`Dev Server: ${origin}`];
		if (Object.keys(openPage).length > 0) {
			for (let item in openPage) {
				messages.push(`${item}: ${origin}${openPage[item]}`);
			}
		}

		const defaultOptions = {
			mode: 'development',
			devtool: 'cheap-module-eval-source-map',
			entry,
			output: {
				path: resolve(__dirname, '../dist'),
				filename: `js/[name].bundle.js`,
				chunkFilename: `js/[name].chunk.js`,
				sourceMapFilename: `js/[name].bundle.map`,
				publicPath: '/',
			},
			resolve: {
				modules: NMS,
				extensions: ['.vue', '.js', '.json', '.md', '.css', '.scss'],
				symlinks: true,
				alias: {
					'vue$': resolvePackage('vue/dist/vue.esm.js'),
					'babel-runtime': resolvePackage('@babel/runtime')
				}
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude,
						use: {
							loader: resolvePackage('babel-loader'),
							options: {
								babelrc: false,
								configFile: false,
								compact: false,
								cacheDirectory: true,
								presets: [
									resolvePackage('@babel/preset-env')
								],
								plugins: [
									resolvePackage('@babel/plugin-proposal-export-namespace-from'),
									resolvePackage('@babel/plugin-proposal-export-default-from'),
									resolvePackage('@babel/plugin-proposal-function-bind'),
									resolvePackage('@babel/plugin-syntax-dynamic-import'),
									resolvePackage('@babel/plugin-transform-modules-commonjs'),
									resolvePackage('@babel/plugin-syntax-jsx'),
									resolvePackage("@babel/plugin-transform-runtime"),
									resolvePackage('babel-plugin-transform-vue-jsx'),
									[
										resolvePackage('@babel/plugin-proposal-decorators'),
										{
											"legacy": true
										}
									],
									[
										resolvePackage('@babel/plugin-proposal-class-properties'),
										{
											"loose": true
										}
									]
								]
							}
						}
					},
					{
						test: /\.vue$/,
						exclude,
						use: [
							{
								loader: resolvePackage('vue-loader'),
							},
							{
								loader: resolvePackage('@wya/vc-loader'),
							}
						]
					},
					{
						test: /\.(scss|css)$/,
						use: [
							resolvePackage('vue-style-loader'),
							resolvePackage('css-loader'),
							resolvePackage('sass-loader'),
							{
								loader: resolvePackage('sass-resources-loader'),
								options: {
									resources: [
										resolvePackage("@wya/sass/lib/mixins/bem.scss")
									]
								}
							}
						]
					},
					{
						test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
						loader: resolvePackage('url-loader')
					}
				]
			},
			plugins: [
				new VueLoaderPlugin(),
				new FriendlyErrorsPlugin({
					compilationSuccessInfo: {
						messages,
						notes: [`Success!`]
					}
				}),
				...htmls
			]
		};

		return merge(defaultOptions);
	}

	generateServer() {
		const { port, host } = this.$parent;

		return merge(
			{
				hot: true,
				quiet: true,
				historyApiFallback: true,
				publicPath: '/',
				port,
				host
			}
		);
	}

}
module.exports = {
	get(type = 'webpack', parent) {
		return new Config(type, parent).result;
	}
};
