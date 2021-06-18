
const recast = require("recast");
const { namedTypes } = require('ast-types');
const { parserConfig } = require('./config');
const { createSpreadElement, createImportDeclaration, getSpreadElement } = require('./utils');

/**
 * app.js 文件插入代码片段
 * @param {*} source 原文件内容
 */
module.exports = (source, opts) => {
	const { moduleName } = opts || {};
	const sourceAST = recast.parse(source, {
		...parserConfig,
		sourceFileName: 'source.js'
	});
	
	let isImported = false;
	let lastImportPath = null; // 最后一个引入的语句
	recast.visit(sourceAST, {
		visitImportDeclaration(path) {
			const node = path.node;
			const regex = new RegExp(`${moduleName}$`);
			if (isImported) return this.abort(); // 终止遍历
			if (namedTypes.ImportDeclaration.check(node)) {
				lastImportPath = path;
				isImported = regex.test(node.source.value);
			}
			this.traverse(path); // 继续遍历
		},
		visitVariableDeclarator(path) {
			const node = path.node;
			if (node.id.name === 'API') {
				if (!isImported) {
					const importDeclaration = createImportDeclaration({ name: moduleName });
					const APISpreadElement = createSpreadElement({ name: moduleName });
					node.init.properties.push(APISpreadElement);
					lastImportPath && lastImportPath.insertAfter(importDeclaration);
				}
				this.abort(); // 终止遍历
			}
			this.traverse(path); // 继续遍历
		},
	});

	return recast.print(sourceAST).code;
};