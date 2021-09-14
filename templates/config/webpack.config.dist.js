process.env.NODE_ENV = 'production';
const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { APP_ROOT, commonConfig } = require('./webpack.config.common');

const webpackConfig = {
	mode: "production",
	optimization: {
		minimize: JSON.parse(process.env.UGLIFY_JS),
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: {
						safari10: true
					}
				},
			})
		],
	},
	plugins: [
		/**
		 * 输出html
		 */
		 new HtmlWebpackPlugin({
			template: path.resolve(APP_ROOT, 'src/static/index.tpl.html'),
			chunks: ['common', 'main'], // 当前路由所包含的模块，注意common引入方式
			inject: 'body',
			filename: './index.html'
		}),
		/**
		 * 压缩同时转移静态文件
		 */
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(APP_ROOT, 'src/static'),
					to: '[name].[ext]',
					toType: 'template'
				}
			]
		}),
		/**
		 * 生产环境
		 * webpack 4 默认支持: 'process.env.NODE_ENV': JSON.stringify('production')
		 */
		new webpack.DefinePlugin({
			__DEV__: 'false'
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static', // static 生成html文件 | server 一直监听 | disabled 生成json文件
			// analyzerHost: localIp,
			// analyzerPort: bundleAnalyzerPort,
			reportFilename: 'report.html',
			defaultSizes: 'gzip',
			openAnalyzer: false,
			generateStatsFile: false,
			// statsFilename: 'stats.json',
			// statsOptions: null,
			logLevel: 'info'
		})
	],
};

module.exports = merge(
	commonConfig,
	webpackConfig
);