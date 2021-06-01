const upath = require('upath');
const chalk = require('chalk');
const { pathExistsSync, outputFileSync, readFileSync } = require('fs-extra');
const navConfigHBS = require('./nav-config.hbs');
const navConfigAppend = require('../../actions/nav-config-append');

module.exports = (opts) => {
	const { dir, template, pathArr } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const childName = childPathArr.join('-');
	const outputPath = upath.normalize(`${dir}components/layout/nav-config.js`);

	const isFileExist = pathExistsSync(outputPath);

	const navConfigContent = isFileExist ? readFileSync(outputPath) : navConfigHBS();

	const content = navConfigAppend(navConfigContent, { moduleName });

	console.log(chalk`{green nav-config.js}: {rgb(255,131,0) ${isFileExist ? 'modified' : 'created'}}`);
	outputFileSync(outputPath, content);
};