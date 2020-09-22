const fs = require('fs-extra');
const path = require('path');
const { prompt, Separator, registerPrompt } = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const glob = require('glob');
const DevProcess = require('./dev');
const { getEntryFile, getPathInfo, getHTMLConfig } = require('./utils.js');

module.exports = class SFCManager {
	constructor(options = {}) {
		const defaultOptions = {
			withI18n: false,
			config: 'vue.config.js',
			pattern: null
		};
		this.options = { ...defaultOptions, ...options };
		this.sourceDir = this.options.sourceDir;

		this.promptSchedule = new Promise((r) => {
			this._promptSchedule = r;
		});
		if (this.options.pattern) {
			this._prompt()
				.then((sourceDir) => {
					this._init(sourceDir);
					this._promptSchedule();
				})
				.catch(res => {
					console.log(res);
				});
		} else {
			this._promptSchedule();
			this._init();
		}
	}

	_init(sourceDir) {
		this.sourceDir = sourceDir || this.options.sourceDir;
		this.cwd = process.cwd();
		this.tempDir = path.resolve(
			getPathInfo(this.sourceDir).baseDir, 
			'./.temp'
		);

		fs.removeSync(this.tempDir);
		process.on('SIGINT', () => {
			console.log('Exit now!');
			fs.removeSync(this.tempDir);
			process.exit();
		});

		this.webpackAssist = getEntryFile(this.sourceDir);
	}

	_prompt() {
		return new Promise((resolve, reject) => {
			const files = glob.sync(this.options.pattern, {
				root: this.sourceDir
			});
			const question = [
				{
					type: 'autocomplete',
					message: 'Select component:',
					name: 'dir',
					// suggestOnly: true, 开启后可以验证数据且需要使用tab选中
					default: files[0],
					source: (answers, input) => {
						input = input || '';
						return new Promise(($resolve => {
							let filter = input 
								? files.filter(item => item.includes(input))
								: files;
							$resolve(filter);
						}));
					}
				}
			];
			registerPrompt('autocomplete', autocomplete);

			prompt(question)
				.then(({ dir }) => {
					resolve(path.resolve(this.sourceDir, dir));
				}).catch(() => {
					reject(res);
				});
		});
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
		await this.promptSchedule;
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

