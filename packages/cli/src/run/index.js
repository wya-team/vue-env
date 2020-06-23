const fs = require('fs-extra');
const path = require('path');
const DevProcess = require('./dev');
const BuildProcess = require('./build');

module.exports = class RunManager {
	constructor(options = {}) {
		const defaultOptions = {
			withI18n: false,
			config: 'vue.config.js',
		};
		this.options = { ...defaultOptions, ...options };
		this.sourceDir = this.options.sourceDir;

		// 给gulp使用
		process.env.SOURCE_DIR = this.sourceDir;
		
		this.cwd = process.cwd();
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
					});
			} catch (err) {
				resolve(err);
			}
		});
		if (error) {
			throw error;
		}
		return this;
	}

	async build() {
		await this.process();

		this.buildProcess = new BuildProcess(this);
		await this.buildProcess.process();
		
		return this;
	}
};

