const { prompt, Separator } = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const upath = require('upath');
const createProcess = require('./add');

const { resolve } = path;
module.exports = class AddManager {
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
				message: 'Project Name:',
				validate(val) {
					if (val === '') {
						return 'Project Name is required!';
					} else {
						return true;
					}
				}
			},
			{
				type: 'list',
				name: 'template',
				message: 'Select template:',
				choices: [
					new Separator(' = For template = '),
					'basic',
					'paging',
					'scroll',
					'form'
				],
				default: 'basic'
			},
			{
				type: 'list',
				name: 'pagingType',
				message: 'Select type:',
				when: (answers) => /(paging|scroll)/.test(answers.template),
				choices: [
					new Separator(' = For template = '),
					'basic',
					'tabs'
				],
				default: 'basic'
			},
			{
				type: 'list',
				name: 'pagingMode',
				message: 'Select mode:',
				when: (answers) => /(paging)/.test(answers.template),
				choices: [
					new Separator(' = For template = '),
					'table',
					'piece',
					'native'
				],
				default: 'table'
			},
			{
				type: 'confirm',
				name: 'store',
				message: 'use store(vuex):',
				when: (answers) => !(/(paging|scroll)/.test(answers.template)),
				default: false
			},
			{
				type: 'input',
				name: 'path',
				message: 'RoutePath is required:',
				default: '/home',
				when: (answers) => answers.type !== 'none',
				validate(val) {
					if (val === '') {
						return 'Name is required!';
					} else {
						return true;
					}
				}
			},
			{
				type: 'input',
				name: 'dir',
				message: 'Where to in the project:',
				when: (answers) => answers.type !== 'none',
				default: (answers) => upath.normalize(`${process.cwd()}/src/pages/`),
				// default: upath.normalize(`${process.cwd()}/tmp/`),
				// default: upath.normalize(`${process.cwd()}/tmp/src/pages/`),
				validate(val) {
					if (val === `${process.cwd()}/tmp/`) {
						// shell.rm('-rf', 'tmp');
					}
					return true;
				}
			}
		];
	}

	_transform(arr = []) {
		const result = {
			template: ['form', 'basic', 'paging', 'scroll'].includes(arr[0]) ? arr[0] : undefined,
			pagingType: ['tabs', 'basic'].includes(arr[1]) ? arr[1] : undefined,
			pagingMode: ['native', 'piece', 'table'].includes(arr[2]) ? arr[2] : undefined,
		};
		return result;
	}

	_loopMake() {
		const config = require(resolve(this.options.config)); // eslint-disable-line
		const { routes, ...rest } = config.default || config;
		config.routes.forEach((item, index) => {
			createProcess({ 
				...rest, 
				...item, 
				...this._transform(item.template),
				force: true
			});
		});
	}

	/**
	 * 用于准备当前应用程序上下文的异步方法
	 * 其中包含加载页面和插件、应用插件等。
	 */
	async process() {
		// TODO: 检查是否存在stages和未unstages的文件
		this.options.config
			? this._loopMake()
			: prompt(this._getQuesion()).then(createProcess);
	}
};

