const upath = require('upath');
const chalk = require('chalk');
const fs = require('fs-extra');
const containerHBS = require('./container.hbs');

module.exports = (opts) => {
	const { dir, project, title, pathArr, pagingType, pagingMode } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const pathName = `${pathArr.join('-')}`;
	const childName = childPathArr.join('-');

	const isBasicType = pagingType === 'basic';

	const isTableMode = pagingMode === 'table';
	const isPieceMode = pagingMode === 'piece';
	const isNativeMode = pagingMode === 'native';

	const outputItemPath = upath.normalize(`${dir}components/${moduleName}/${childName}/item.vue`);
	const outputListPath = upath.normalize(`${dir}components/${moduleName}/${childName}/${isBasicType ? 'list' : 'tabs-list'}.vue`);
	const outputFilterPath = upath.normalize(`${dir}components/${moduleName}/${childName}/filter.vue`);
	const outputContainerPath = upath.normalize(`${dir}containers/${moduleName}/modules/${pathName}.vue`);
	
	const mutationPrefix = `${pathArr.join('_')}`.toUpperCase();

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
		containerHBS({
			project,
			title,
			moduleName,
			childName,
			componentName: `${project}-${pathName}-filter`,
			mutationPrefix,
			className: `v-${pathName}-filter`
		})
	);
};