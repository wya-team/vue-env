const upath = require('upath');
const chalk = require('chalk');
const fs = require('fs-extra');
const containerHBS = require('./container.hbs');
const itemHBS = require('./item.hbs');
const listHBS = require('./list.hbs');

module.exports = (opts) => {
	const { dir, project, title, route, pathArr, pagingType, pagingMode } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const pathName = `${pathArr.join('-')}`;
	const childName = childPathArr.join('-');

	const isBasic = pagingType === 'basic';

	const outputItemPath = upath.normalize(`${dir}components/${moduleName}/${childName}/item.vue`);
	const outputListPath = upath.normalize(`${dir}components/${moduleName}/${childName}/${isBasic ? 'list' : 'tabs-list'}.vue`);
	const outputContainerPath = upath.normalize(`${dir}containers/${moduleName}/modules/${pathName}.vue`);
	
	const mutationPrefix = `${pathArr.join('_')}`.toUpperCase();
	const extra = childPathArr.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
	const stateName = `${moduleName}${extra}`;

	console.log(chalk`{green scroll container}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputContainerPath,
		containerHBS({
			project,
			title,
			moduleName,
			childName,
			componentName: `${project}-${pathName}`,
			mutationPrefix,
			isBasic
		})
	);
	console.log(chalk`{green scroll item}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputItemPath,
		itemHBS({
			project,
			moduleName,
			childName,
			componentName: `${project}-${pathName}-item`,
			mutationPrefix,
			className: `v-${pathName}-item`,
		})
	);
	console.log(chalk`{green scroll list}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputListPath,
		listHBS({
			project,
			title,
			route,
			moduleName,
			childName,
			componentName: `${project}-${pathName}-list`,
			mutationPrefix,
			stateName,
			className: `v-${pathName}-list`,
			pagingMode,
			isBasic,
		})
	);
};