const { prompt, Separator } = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const upath = require('upath');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');

const { downloadFromGithub } = require('@wya/toolkit-utils');

const { resolve } = path;
const { log } = console;

const ADMIN_PRO_GIT_PATH = 'direct:https://github.com/wya-team/vue-admin/archive/refs/heads';

module.exports = class InitManager {
	constructor(options = {}) {
		const defaultOptions = {
			// TODO
		};
		this.options = { ...defaultOptions, ...options };

		this.cwd = process.cwd();
		this.sourceDir = this.options.sourceDir;

		if (this.options.config) {
			this.configDir = path.resolve(this.options.config);
		}
	}

	_getQuesion() {
		return [
			{
				type: 'input',
				name: 'project',
				message: 'Project name:',
				validate(val) {
					if (val !== '') {
						return true;
					}
					return 'Project name is required!';
				}
			},
			{
				type: 'input',
				name: 'place',
				message: 'Where to init the project:',
				default: process.cwd()
			},
			{
				type: 'list',
				name: 'branch',
				message: 'Select branch:',
				// 可提供分支
				choices: [
					'main',
					'master'
				],
				validate(val) {
					if (val !== '') {
						return true;
					}
					return 'branch is required!';
				}
			}
		];
	}

	/**
	 * 用于准备当前应用程序上下文的异步方法
	 * 其中包含加载页面和插件、应用插件等。
	 */
	async process() {
		prompt(this._getQuesion())
			.then((opts = {}) => {
				// options
				let { project, place, branch } = opts;
				
				let options = {
					owner: 'wya-team',
					repo: 'vue-env',
					ref: branch || 'master',
					path: 'templates',
					dest: `${place}/${project}`
				};
				// log(chalk`{yellow ${JSON.stringify(options, null, '\t')}}`);
				// downloadFromGithub(options);
				const repository = `${ADMIN_PRO_GIT_PATH}/${options.ref}.zip`;
				log(chalk`{yellow 模板仓库地址：${repository}}`);
				// 显示下载进度.
				const process = ora(`代码下载中...`).start();
				download(repository, options.dest, function (err) {
					if (err) {
						console.log('err', err);
						process.fail(chalk`{red 项目创建失败!}`); 
					} else {
						process.succeed(chalk`{green 项目创建成功!}`);
					}
				});
			})
			.catch(e => {
				log(chalk`{red ${e}}`);
			});
	}
};

