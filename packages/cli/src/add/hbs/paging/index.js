const upath = require('upath');
const chalk = require('chalk');
const fs = require('fs-extra');
const containerHBS = require('./container.hbs');
const filterHBS = require('./filter.hbs');
const itemHBS = require('./item.hbs');
const listHBS = require('./list.hbs');

module.exports = (opts) => {
	const { dir, project, title, route, pathArr, pagingType, pagingMode } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const pathName = `${pathArr.join('-')}`;
	const childName = childPathArr.join('-');

	const isBasic = pagingType === 'basic';

	const isTableMode = pagingMode === 'table';
	const isPieceMode = pagingMode === 'piece';
	const isNativeMode = pagingMode === 'native';

	const outputItemPath = upath.normalize(`${dir}components/${moduleName}/${childName}/item.vue`);
	const outputListPath = upath.normalize(`${dir}components/${moduleName}/${childName}/${isBasic ? 'list' : 'tabs-list'}.vue`);
	const outputFilterPath = upath.normalize(`${dir}components/${moduleName}/${childName}/filter.vue`);
	const outputContainerPath = upath.normalize(`${dir}containers/${moduleName}/modules/${pathName}.vue`);
	
	const mutationPrefix = `${pathArr.join('_')}`.toUpperCase();
	const extra = childPathArr.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
	const stateName = `${moduleName}${extra}`;

	console.log(chalk`{green paging container}: {rgb(255,131,0) created}`);
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
	console.log(chalk`{green paging filter}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputFilterPath,
		filterHBS({
			project,
			title,
			moduleName,
			childName,
			componentName: `${project}-${pathName}-filter`,
			mutationPrefix,
			className: `v-${pathName}-filter`
		})
	);
	console.log(chalk`{green paging item}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputItemPath,
		itemHBS({
			project,
			title,
			moduleName,
			childName,
			componentName: `${project}-${pathName}-item`,
			mutationPrefix,
			className: `v-${pathName}-item`,
			isTableMode,
			isPieceMode,
			isNativeMode,
		})
	);
	console.log(chalk`{green paging list}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputListPath,
		listHBS({
			project,
			title,
			route,
			moduleName,
			childName,
			componentName: `${project}-${pathName}-table`,
			mutationPrefix,
			stateName,
			className: `v-${pathName}-list`,
			pagingMode,
			isBasic,
			isTableMode,
			isPieceMode,
			isNativeMode,
		})
	);
};