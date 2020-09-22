const fs = require('fs-extra');
const path = require('path');
const DevProcess = require('./dev');
const { getEntryFile, getPathInfo, getHTMLConfig } = require('./utils.js');

module.exports = class SFCManager {
	constructor(options = {}) {
		const defaultOptions = {
			withI18n: false,
			config: 'vue.config.js',
		};
		this.options = { ...defaultOptions, ...options };
		this.sourceDir = this.options.sourceDir;
		this.cwd = process.cwd();
		this.tempDir = path.resolve(
			getPathInfo(this.sourceDir).baseDir, 
			'./.temp'
		);

		fs.removeSync(this.tempDir);
		this.webpackAssist = getEntryFile(this.sourceDir);
	}




	/**
	 * 用于准备当前应用程序上下文的异步方法
	 * 其中包含加载页面和插件、应用插件等。
	 */
	async process() {
		return new Promise((resolve, reject) => {
			// TODO 
			resolve();
		});
	}

	async dev() {
		await this.process();
		this.devProcess = new DevProcess(this);
		await this.devProcess.process();
		
		const error = await new Promise(resolve => {
			try {
				this.devProcess
					.on('fileChanged', () => { 
						this.process();
					})
					.createServer()
					.listen(resolve);
			} catch (err) {
				resolve(err);
			}
		});
		if (error) {
			throw error;
		}
		return this;
	}
};

