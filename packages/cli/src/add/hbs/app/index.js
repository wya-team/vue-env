const upath = require('upath');
const chalk = require('chalk');
const { pathExistsSync, outputFileSync, readFileSync } = require('fs-extra');
const appHBS = require('./app.hbs');
const routeHBS = require('./route.hbs');
const appAppend = require('../../actions/app-append');

module.exports = (opts) => {
	const { dir, project, template, path, title, pathArr, vcPrefix, isNav } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const pathName = `${pathArr.join('-')}`;
	const childName = childPathArr.join('-');
	const outputPath = upath.normalize(`${dir}containers/${moduleName}/app.js`);
	
	const isFileExist = pathExistsSync(outputPath);

	let appContent = appHBS({ title, moduleName });
	if (isFileExist) {
		appContent = readFileSync(outputPath, 'utf8');	
	}
	routeContent = routeHBS({ 
		path, 
		title,
		pathName,
		isPaging: template === 'paging' 
	});

	const content = appAppend(appContent, routeContent, { 
		isNav,
		moduleName,
		pathArr
	});

	console.log(chalk`{green app.js}: {rgb(255,131,0) created}`);
	outputFileSync(outputPath, content);
};