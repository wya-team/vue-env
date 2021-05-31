const upath = require('upath');
const chalk = require('chalk');
const fs = require('fs-extra');
const componentHBS = require('./component.hbs');
const containerHBS = require('./container.hbs');

module.exports = (opts) => {
	const { dir, project, title, pathArr } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const pathName = `${pathArr.join('-')}`;
	const childName = childPathArr.join('-');
	const outputCompPath = upath.normalize(`${dir}components/${moduleName}/${childName}/content.vue`);
	const outputContainerPath = upath.normalize(`${dir}containers/${moduleName}/modules/${pathName}.vue`);
	
	console.log(chalk`{green form component}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputCompPath,
		componentHBS({
			componentName: `${project}-${pathName}-content`,
			className: `v-${pathName}-content`
		})
	);

	console.log(chalk`{green form container}: {rgb(255,131,0) created}`);
	fs.outputFileSync(
		outputContainerPath,
		containerHBS({
			project,
			title,
			moduleName,
			childName,
			componentName: `${project}-${pathName}`,
		})
	);
};