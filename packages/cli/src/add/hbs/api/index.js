const upath = require('upath');
const chalk = require('chalk');
const { pathExistsSync, outputFileSync, readFileSync } = require('fs-extra');
const apiHBS = require('./api.hbs');
const apiAppend = require('../../actions/api-append');
const apiRootAppend = require('../../actions/api-root-append');

const createAPIRoot = (opts) => {
	const { dir, moduleName } = opts || {};
	const outputPath = upath.normalize(`${dir}stores/apis/root.js`);
	if (!pathExistsSync(outputPath)) {
		console.log(chalk`{red api root 文件不存在}`);
		return;
	}
	const apiRootContent = readFileSync(outputPath, 'utf8');
	const content = apiRootAppend(apiRootContent, { moduleName });
	console.log(chalk`{green api/root.js}: {rgb(255,131,0) modified}`);
	outputFileSync(outputPath, content);	
};

module.exports = (opts) => {
	const { dir, template, pagingFeature, pathArr } = opts || {};
	const [moduleName, ...childPathArr] = pathArr || [];
	const outputPath = upath.normalize(`${dir}stores/apis/${moduleName}.js`);
	const APIName = `${pathArr.join('_')}`;
	
	const isFileExist = pathExistsSync(outputPath);
	let apiContent = isFileExist ? readFileSync(outputPath, 'utf8') : apiHBS();	
	const content = apiAppend(apiContent, { 
		template,
		pagingFeature,
		APIName
	});

	console.log(chalk`{green ${moduleName}.js}: {rgb(255,131,0) ${isFileExist ? 'modified' : 'created'}}`);
	outputFileSync(outputPath, content);

	createAPIRoot({ dir, moduleName });
};