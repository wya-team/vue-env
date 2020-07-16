console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
const APP_ROOT = process.cwd();
const ENV_IS_DEV = process.env.NODE_ENV === 'development';

const path = require('path');
const fs = require('fs-extra');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

const userConfig = fs.existsSync(path.resolve(__dirname, './user.config.js')) 
	? require('./user.config.js')
	: {};

const localPort = (() => {
	if (ENV_IS_DEV) {
		return userConfig.port || 8088;
	}
	return 9098;
})();
const localIp = (() => {
	const ips = [];
	const os = require('os');
	const ntwk = os.networkInterfaces();
	for (const k in ntwk) {
		for (let i = 0; i < ntwk[k].length; i++) {
			const _add = ntwk[k][i].address;
			if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
				ips.push(ntwk[k][i].address);
			}
		}
	}
	return ips[0] || 'localhost';
})();
const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: path.resolve(APP_ROOT, 'config/postcss.config.js')
		}
	}
};
const loaderPath = [
	path.resolve(APP_ROOT, "node_modules/@wya/vc"),
	path.resolve(APP_ROOT, "node_modules/fast-xml-parser"), // 第三方库未编译，导致iOS8不兼容
	path.resolve(APP_ROOT, "src")
];

const webpackConfig = {
	target: "web", // <=== 默认是 'web'，可省略
	resolve: { // 重定向路径
		mainFiles: ['index'],
		modules: [path.resolve(APP_ROOT, 'src'), 'node_modules'],
		extensions: ['.js', '.vue', '.json', '.scss', '.css'],
		// 依赖-正则
		alias: {
			/**
			 * 一个是 runtime only 的文件 vue.common.js，
			 * 一个是 compiler only 的文件 compiler.js，
			 * 一个是 runtime + compiler 的文件 vue.js。
			 * 也就是说，vue.js = vue.common.js + compiler.js
			 * 而如果要使用 template 这个属性的话就一定要用 compiler.js，那么，引入 vue.js 是最恰当的
			 */
			'vue$': 'vue/dist/vue.esm.js',
			'@components': path.resolve(APP_ROOT, './src/pages/components'),
			'@constants': path.resolve(APP_ROOT, './src/pages/constants'),
			'@extends': path.resolve(APP_ROOT, './src/pages/extends'),
			'@containers': path.resolve(APP_ROOT, './src/pages/containers'),
			'@routers': path.resolve(APP_ROOT, './src/pages/routers'),
			'@utils': path.resolve(APP_ROOT, './src/pages/utils'),
			'@stores': path.resolve(APP_ROOT, './src/pages/stores'),
			'@mutations': path.resolve(APP_ROOT, './src/pages/stores/mutations'),
			'@common': path.resolve(APP_ROOT, './src/pages/components/_common'),
			'node_modules/echarts': path.resolve(APP_ROOT, './node_modules/echarts'),
			// 强制使用babel7
			'babel-runtime': '@babel/runtime',
			'babel-core': '@babel/core'

		}
	},
	entry: {
		main: path.resolve(APP_ROOT, 'src/pages/main.js')
	},
	output: {
		path: path.resolve(APP_ROOT, 'dist'),
		filename: 'js/[name].[hash:8].bundle.js', // 每个页面对应的主js的生成配置
		chunkFilename: 'js/[name].[hash:8].chunk.js', // chunk生成的配置
		sourceMapFilename: 'js/[name].[hash:8].bundle.map',
		/**
		 * html引用路径
		 * publicPath: ENV_IS_DEV ? './' : 'https://cdn.example.com/'
		 */
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: loaderPath,
				use: [
					{
						loader: 'babel-loader',

						// node_modules/.cache/babel-loader 编译缓存，独立于babel.config.js
						options: {
							cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.vue/,
				include: loaderPath,
				use: [
					{
						loader: 'vue-loader',
					},
					{
						loader: '@wya/vc-loader',
					}
				]
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'vue-style-loader', 
					'css-loader', 
					postcssLoader, 
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.resolve(APP_ROOT, "src/css/themes/index.scss")
							]
						}
					}
				],
				// 组件内的样式
				include: [
					path.resolve(APP_ROOT, "src/pages"),
					path.resolve(APP_ROOT, "node_modules"),
					// 兼容lerna的情况
					path.resolve(APP_ROOT, "../node_modules")
				]
			},
			{
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					postcssLoader,
					'sass-loader'
				],
				// 全局的样式
				include: [
					path.resolve(APP_ROOT, "src/css")
				]
			},
			{
				test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			},
			{
				test: /\.html$/i,
				use: 'html-loader'
			}
		]
	},
	optimization: {
		// 默认关闭压缩
		minimize: ENV_IS_DEV ? false : JSON.parse(process.env.UGLIFY_JS),
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: {
						safari10: true
					}
				},
			})
		],
		// 原：NamedModulesPlugin()
		namedModules: true,
		// 原：NoEmitOnErrorsPlugin() - 异常继续执行
		noEmitOnErrors: true,
		// 原：ModuleConcatenationPlugin() - 模块串联 - dev模式下回影响antd（比如：Pagination, 和语言有关）
		concatenateModules: !ENV_IS_DEV,
		// 原：CommonsChunkPlugin()
		splitChunks: {
			name: true,
			cacheGroups: {
				commons: {
					test: (chunk) => {
						const modules = [
							'@babel/polyfill',
							'vue',
							'vue-router',
							'vuex',
							'core-js',
							'lodash' // 这个用的地方偏多
						];
						// new RegExp(`([\\\\/]+)node_modules([\\\\/]+)`) -> /([\\\/]+)node_modules([\\\/]+)/
						const isInModules = modules.some(i => (new RegExp(`([\\\\/]+)node_modules([\\\\/_]+)${i}`)).test(chunk.resource));
						return chunk.resource
							&& /\.js$/.test(chunk.resource)
							&& isInModules;
					},
					name: 'common',
					chunks: 'all',
				}
			}
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/initial.[name].[hash:8].css'
		}),
		new VueLoaderPlugin()
	]
};
const defaultConfig = {
	// cheap-module-eval-source-map 原始源码（仅限行）
	// cheap-eval-source-map 转换过的代码（仅限行）// 重构建比较好
	devtool: ENV_IS_DEV ? 'cheap-module-eval-source-map' : undefined,
	resolve: {
		extensions: ['.jsx', '.js']
	},
	devServer: {
		host: localIp,
		contentBase: "/",
		port: localPort,
		inline: true,
		// compress: true, // gzip
		stats: 'errors-only',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 100,
			poll: 500,
			ignored: /node_modules/
		},
		// proxy: {
		// 	"/api": {
		// 		target: "http://test.com",
		// 		secure: false, // https接口
		// 		changeOrigin: true, // 接口跨域
		// 		pathRewrite: {"^/api" : ""}
		// 	}
		// },
		hot: true, // 同--hot
	},
	node: {
		global: true,
		crypto: 'empty',
		__dirname: true,
		__filename: true,
		Buffer: true,
		clearImmediate: false,
		setImmediate: false
	},
	// 启用编译缓存
	cache: true,
};

module.exports = {
	APP_ROOT,
	localIp,
	localPort,
	commonConfig: merge(
		webpackConfig,
		defaultConfig
	)
};
