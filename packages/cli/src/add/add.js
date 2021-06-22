/**
 * 根据路由创建文件
 */
const { prompt } = require('inquirer');
const upath = require('upath');
const chalk = require('chalk');
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const createBasic = require('./hbs/basic/index'); 
const createForm = require('./hbs/form/index'); 
const createApp = require('./hbs/app/index'); 
const createApi = require('./hbs/api/index'); 
const createStore = require('./hbs/store/index'); 
const createLayout = require('./hbs/layout/index'); 
const createPaging = require('./hbs/paging/index'); 
const createScroll = require('./hbs/scroll/index'); 
 
/**
  * TODO:
  * 4. 通过ast插入的代码 tab和换行等存在问题（api/root; layout/nav-config; app.js）
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
		pagingFeature, // paging的特征【多选，展开】
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

	const createTemplate = {
		basic: createBasic,
		form: createForm,
		paging: createPaging,
		scroll: createScroll,
	};

	generator = () => {
		createTemplate[template]({ 
			dir,
			project,
			title,
			route,
			pathArr, 
			vcPrefix,
			pagingType,
			pagingMode,
			pagingFeature
		});
		
		createApp({ dir, project, path, template, title, pathArr, isNav, vcPrefix });
		createApi({ dir, template, pathArr, pagingFeature });

		// PC 端需要插入到layout的nav-config
		if (isNav && !isMobile) {
			createLayout({ dir, template, pathArr });
		}
		if (hasStore) {
			createStore({ dir, template, pathArr, pagingType });
		}
	};

	/**
	 * Handlebars 注册可以被当前环境中任意模版访问的助手代码。
	 */
	const _registerHelper = () => {
		Handlebars.registerHelper({
			'support-block-helper': (options) => options.fn()
		});
	};

	_registerHelper();

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