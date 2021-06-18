
const recast = require("recast");
const { namedTypes } = require('ast-types');
const { parserConfig } = require('./config');
const { createSpreadElement, createImportDeclaration, getSpreadElement } = require('./utils');

/**
 * app.js 文件插入代码片段
 * @param {*} source 原文件内容
 */
module.exports = (source, opts) => {
	const { moduleName, stateName } = opts || {};
	const sourceAST = recast.parse(source, parserConfig);
	const regex = new RegExp(`${moduleName}/root$`);
	
	let isImported = false;
	let lastImportPath = null; // 最后一个引入的语句
	recast.visit(sourceAST, {
		visitImportDeclaration(path) {
			const node = path.node;
			if (isImported) return this.abort(); // 终止遍历
			if (namedTypes.ImportDeclaration.check(node)) {
				lastImportPath = path;
				isImported = regex.test(node.source.value);
			}
			this.traverse(path); // 继续遍历
		},
	});
	
	recast.visit(sourceAST, {
		visitExportDefaultDeclaration(path) {
			const objectExpression = path.node.declaration;
			const properties = objectExpression.properties || [];
			
			if (isImported) return this.abort(); // 终止遍历

			const importDeclaration = createImportDeclaration({ 
				name: moduleName, 
				importPath: `./${moduleName}/root`
			});
			if (!isImported) {
				spreadElement = createSpreadElement({ name: moduleName });
				properties.push(spreadElement);
				if (lastImportPath) {
					lastImportPath.insertAfter(importDeclaration);
				} else {
					path.insertBefore(importDeclaration);
				}
			}
			this.abort(); // 终止遍历
		},
	});
	
	return recast.print(sourceAST).code;
};