/**
 * 根据路由创建文件
 */
const { prompt } = require('inquirer');
const upath = require('upath');
const chalk = require('chalk');
const fs = require('fs-extra');
const basicHbs = require('../hbs/basic/index'); 
const formHbs = require('../hbs/form/index'); 
const appHbs = require('../hbs/app/index'); 
const apiHbs = require('../hbs/api/index'); 

/**
 * TODO:
 * 1. 该路由是否为导航路由
 * 2. Paging是否为展开
 * 3. Paging是否为多选
 * 4. 单个文件的模板
 * @param {*} opts 
 */



module.exports = (opts) => {
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
		force,
		mobile = false,
		navigation: isNav
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

	const isMobile = mobile || template === 'scroll';
	const vcPrefix = isMobile ? 'vcm' : 'vc';

	generator = () => {
		if (template === 'basic') {
			basicHbs({ dir, project, title, pathArr });
		} else if (template === 'form') {
			formHbs({ dir, project, title, pathArr, vcPrefix });
		} else if (template === 'paging') {
			// 
		} else if (template === 'scroll') {
			// 
		}
		
		appHbs({ dir, project, path, template, title, pathArr, isNav, vcPrefix });
		apiHbs({ dir, template, pathArr });

		// TODO: 
		if (isNav) {
			console.log('waiting'); // PC 端需要插入到layout的nav-config
		}
		if (hasStore) {
			console.log('waiting');
		}
	};

	const question = {
		type: 'confirm',
		name: 'sure',
		message: 'Please make sure ~',
		default: false
	};
	return force 
		? generator()
		: prompt(question)
			.then((res) => {
				if (!res.sure) return null;
				generator();
			})
			.catch(e => {
				console.log(chalk`{red ${e}}`);
			});
};