const upath = require('upath');
const chalk = require('chalk');
const { pathExistsSync, outputFileSync, readFileSync } = require('fs-extra');
const navManageHBS = require('./nav-manage.hbs');
const navManageAppend = require('../../actions/nav-manage-append');

module.exports = (opts) => {
	const { dir, template, pathArr } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const outputPath = upath.normalize(`${dir}components/layout/nav-manage.js`);

	const isFileExist = pathExistsSync(outputPath);

	const navManageContent = isFileExist ? readFileSync(outputPath) : navManageHBS();

	const content = navManageAppend(navManageContent, { moduleName });

	console.log(chalk`{green nav-manage.js}: {rgb(255,131,0) ${isFileExist ? 'modified' : 'created'}}`);
	outputFileSync(outputPath, content);
};