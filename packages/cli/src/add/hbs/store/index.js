const upath = require('upath');
const chalk = require('chalk');
const { pathExistsSync, outputFileSync, readFileSync } = require('fs-extra');
const moduleHBS = require('./module.hbs');
const scrollModuleHBS = require('./scroll-module.hbs');
const pagingModuleHBS = require('./paging-module.hbs');
const moduleRootHBS = require('./module-root.hbs');
const moduleRootAppend = require('../../actions/module-root-append'); 
const storeRootAppend = require('../../actions/store-root-append'); 

const createModuleRoot = (opts) => {
	const { dir, moduleName, childName, stateName } = opts;
	const outputPath = upath.normalize(`${dir}stores/modules/${moduleName}/root.js`);
	const moduleContent = pathExistsSync(outputPath) ? readFileSync(outputPath, 'utf8') : moduleRootHBS();
	const content = moduleRootAppend(moduleContent, { childName, stateName });
	console.log(chalk`{green modules/${moduleName}/root.js}: {rgb(255,131,0) modified}`);
	outputFileSync(outputPath, content);	
};

const createStoreRoot = (opts) => {
	const { dir, moduleName, stateName } = opts;
	const outputPath = upath.normalize(`${dir}stores/modules/root.js`);
	if (!pathExistsSync(outputPath)) {
		console.log(chalk`{red store root 文件不存在}`);
		return;
	}
	const rootContent = readFileSync(outputPath, 'utf8');
	const content = storeRootAppend(rootContent, { moduleName, stateName });
	console.log(chalk`{green modules/root.js}: {rgb(255,131,0) modified}`);
	outputFileSync(outputPath, content);	
};

module.exports = (opts) => {
	const { dir, template, pathArr, pagingType } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const childName = childPathArr.join('-');
	const outputPath = upath.normalize(`${dir}stores/modules/${moduleName}/${childName}.js`);
	
	const isPagingBasic = pagingType === 'basic';

	// 创建module
	const mutationPrefix = `${pathArr.join('_')}`.toUpperCase();
	const extra = childPathArr.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
	const stateName = `${moduleName}${extra}`;

	console.log(chalk`{green modules}: {rgb(255,131,0) created}`);
	let moduleContent = '';
	if (template === 'scroll') {
		moduleContent = scrollModuleHBS({
			mutationPrefix,
			stateName,
			isPagingBasic
		});
	} else if (template === 'paging') {
		moduleContent = pagingModuleHBS({
			mutationPrefix,
			stateName,
			isPagingBasic
		});
	} else {
		moduleContent = moduleHBS({
			mutationPrefix,
			stateName,
		});
	}

	console.log(chalk`{green ${childName}.js}: {rgb(255,131,0) created}`);
	outputFileSync(outputPath, moduleContent);

	// 修改module root
	createModuleRoot({ dir, moduleName, childName, stateName });
	// 修改root
	createStoreRoot({ dir, moduleName, stateName });
};