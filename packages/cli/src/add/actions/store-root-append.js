
const recast = require("recast");
const recastParser = require('@babel/parser');
const { namedTypes } = require('ast-types');
const { createSpreadElement, createImportDeclaration, getSpreadElement } = require('./utils');

/**
 * app.js 文件插入代码片段
 * @param {*} source 原文件内容
 */
module.exports = (source, opts) => {
	const { moduleName, stateName } = opts || {};
	const parserConfig = { parser: recastParser }; // recast内置Esprima，但不支持import语法
	const sourceAST = recast.parse(source, parserConfig);
	const regex = new RegExp(`${moduleName}$`);
	
	recast.visit(sourceAST, {
		visitExportDefaultDeclaration(path) {
			const body = path.parent.node.body;
			const objectExpression = path.node.declaration;
			const properties = objectExpression.properties || [];
			let spreadElement = getSpreadElement(properties, stateName);
			const isImported = body.some((it) => {
				return namedTypes.ImportDeclaration.check(it) && regex.test(it.source.value);
			});
			if (spreadElement && isImported) return this.abort(); // 终止遍历

			// 插入import
			const insertIndex = body.reduce((pre, cur, index) => {
				if (namedTypes.ImportDeclaration.check(cur)) pre = index + 1;
				return pre;
			}, 0);
			const importDeclaration = createImportDeclaration({ 
				name: moduleName, 
				importPath: `./${moduleName}/root`
			});
			body.splice(insertIndex, 0, importDeclaration);
			
			// 插入default
			spreadElement = createSpreadElement({ name: moduleName });
			properties.push(spreadElement);

			this.abort(); // 终止遍历
		},
	});
	
	return recast.print(sourceAST).code;
};