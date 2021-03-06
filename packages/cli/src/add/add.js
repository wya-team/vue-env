const { prompt, Separator } = require('inquirer');
const upath = require('upath');
const chalk = require('chalk');
const fs = require('fs-extra');

const { resolve, join } = require('path');
const tpl = require('./templates/index');
const rootTpl = require('./templates/root/index');
const pagingTpl = require('./templates/paging/index');
const formTpl = require('./templates/form/index');
const scrollTpl = require('./templates/scroll/index');

const log = console.log;
const { writeFile } = fs;

module.exports = (opts = {}) => {
	let {
		path,
		dir,
		project,
		template,
		pagingMode,
		pagingType,
		store = false,
		extra = '',
		title = '',
		components,
		force
	} = opts;
	const hasStore = /(paging|scroll)/.test(template) || store;
	let pathArr = path.replace(/\({0,}\//g, '-')
		.replace(/([a-z\dA-Z])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.split('-')
		.filter(item => item && !item.includes(':'));

	// 路由temp
	let route = path;
	// 0
	if (pathArr.length === 0) return;
	// 1
	if (pathArr.length === 1) {
		pathArr[1] = 'main';
		route = `${path}/main`;
	}

	/**
	 * container mutation reducer component
	 */
	let container = pathArr.join('-');
	let mutation = pathArr[0];
	let module = pathArr.slice(1).join('-');

	let basicConfig = {
		router: {
			path: upath.normalize(`${dir}containers/${pathArr[0]}/app.js`)
		},
		container: {
			path: upath.normalize(`${dir}containers/${pathArr[0]}/modules/${container}.vue`)
		},
		component: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/content.vue`)
		},
		api: {
			path: upath.normalize(`${dir}stores/apis/${mutation}.js`)
		},
	};

	if (hasStore) {
		basicConfig = {
			...basicConfig,
			module: {
				path: upath.normalize(`${dir}stores/modules/${mutation}/${module}.js`)
			},
			rootModule: {
				path: upath.normalize(`${dir}stores/modules/${mutation}/root.js`)
			}
		};
	}

	let rootConfig = {
		rootApi: {
			path: upath.normalize(`${dir}stores/apis/root.js`)
		},
		rootRoute: {
			path: upath.normalize(`${dir}routers/routes.dist.js`)
		},
		_rootRoute: {
			path: upath.normalize(`${dir}routers/routes.dev.js`)
		}
	};

	if (hasStore) {
		rootConfig = {
			...rootConfig,
			rootModules: {
				path: upath.normalize(`${dir}stores/modules/root.js`)
			}
		};
	}

	let pagingConfig = {
		// mutation: basicConfig.mutation,
		api: basicConfig.api,
		module: basicConfig.module,
		container: basicConfig.container,
		filter: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/filter.vue`)
		},
		item: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/item.vue`)
		},
		list: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/${pagingType === 'tabs' ? 'tabs-' : ''}list.vue`)
		}
	};

	let scrollConfig = {
		// mutation: basicConfig.mutation,
		api: basicConfig.api,
		module: basicConfig.module,
		container: basicConfig.container,
		item: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/item.vue`)
		},
		list: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/${pagingType === 'tabs' ? 'tabs-' : ''}list.vue`)
		}
	};

	let formConfig = {
		container: basicConfig.container,
		component: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/content.vue`)
		},
	};

	// log
	Object.keys(basicConfig).forEach(key => log(chalk`{green ${key}}: {rgb(255,131,0) ${basicConfig[key].path}}`));

	let question = {
		type: 'confirm',
		name: 'sure',
		message: 'Please make sure ~',
		default: false
	};
	let fn = () => {
		log(chalk('waiting...'));
		Object.keys(basicConfig).forEach(key => {
			let { path: $path } = basicConfig[key];
			let fullpath = join($path);

			let content = '';
			content += `/**\n`;
			content += ` * 请注释相关信息\n`;
			content += ` */`;
			if (!fs.existsSync(fullpath)) {
				// 文件不存在的情况下操作
				log(chalk`{green ${key}}: {rgb(255,131,0) created}`);
				fs.outputFileSync(
					fullpath,
					typeof tpl[key] === 'function'
						? tpl[key]({ mutation, route, pathArr, project, module, extra, title, components, template })
						: content
				);
			} else if (typeof tpl[`${key}Override`] === 'function') {
				// 文件存在，重写相关
				log(chalk`{yellow ${key}}: {rgb(255,131,0) override}`);
				fs.outputFileSync(
					fullpath,
					tpl[`${key}Override`](
						fs.readFileSync(fullpath, 'utf-8'),
						{ mutation, route, pathArr, project, module, extra, title, components, template }
					)
				);
			}
		});

		Object.keys(rootConfig).forEach(key => {
			let { path: $path } = rootConfig[key];
			let _key = key.replace(/_/g, '');

			let fullpath = join($path);
			if (fs.existsSync(fullpath) && typeof rootTpl[_key] === 'function') {
				// 文件存在，重写相关
				log(chalk`{yellow ${key}}: {rgb(255,131,0) override}`);

				fs.outputFileSync(
					fullpath,
					rootTpl[_key](
						fs.readFileSync(fullpath, 'utf-8'),
						{ mutation, pathArr, project, module, extra, title, components }
					)
				);
				
			}
		});
		if (template === 'paging') {
			fs.removeSync(basicConfig.component.path);

			Object.keys(pagingConfig).forEach(key => {
				let { path: $path } = pagingConfig[key];
				let fullpath = join($path);
				if (typeof pagingTpl[key] === 'function') {
					log(chalk`{yellow ${key}}: {rgb(255,131,0) ${fs.existsSync(fullpath) ? 'override' : 'created'}}`);

					fs.outputFileSync(
						fullpath,
						pagingTpl[key](
							fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '',
							{ mutation, pathArr, project, module, pagingMode, pagingType, extra, title, route, components }
						)
					);
					
				}
			});
		}

		if (template === 'scroll') {
			fs.removeSync(basicConfig.component.path);

			Object.keys(scrollConfig).forEach(key => {
				let { path: $path } = scrollConfig[key];
				let fullpath = join($path);
				if (typeof scrollTpl[key] === 'function') {
					log(chalk`{yellow ${key}}: {rgb(255,131,0) ${fs.existsSync(fullpath) ? 'override' : 'created'}}`);

					fs.outputFileSync(
						fullpath,
						scrollTpl[key](
							fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '',
							{ mutation, pathArr, project, module, pagingMode, pagingType, extra, title, route, components }
						)
					);
					
				}
			});
		}

		if (template === 'form') {
			fs.removeSync(basicConfig.component.path);

			Object.keys(formConfig).forEach(key => {
				let { path: $path } = formConfig[key];
				let fullpath = join($path);
				if (typeof formTpl[key] === 'function') {
					log(chalk`{yellow ${key}}: {rgb(255,131,0) ${fs.existsSync(fullpath) ? 'override' : 'created'}}`);

					fs.outputFileSync(
						fullpath,
						formTpl[key](
							fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '',
							{ mutation, pathArr, project, module, extra, title, components }
						)
					);
					
				}
			});
		}

	};
	return force 
		? fn()
		: prompt(question)
			.then((res) => {
				if (!res.sure) return null;
				fn();
			})
			.catch(e => {
				log(chalk`{red ${e}}`);
			});
};
