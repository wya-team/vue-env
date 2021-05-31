
const recast = require("recast");
const recastParser = require('@babel/parser');
const { namedTypes } = require('ast-types');
const { createSpreadElement, createImportDeclaration, getSpreadElement } = require('./utils');

/**
 * app.js 文件插入代码片段
 * @param {*} source 原文件内容
 */
module.exports = (source, opts) => {
	const { moduleName } = opts || {};
	const parserConfig = { parser: recastParser }; // recast内置Esprima，但不支持import语法
	const sourceAST = recast.parse(source, parserConfig);
	
	recast.visit(sourceAST, {
		visitImportDeclaration(path) {
			const body = path.parent.node.body;
			const regex = new RegExp(`${moduleName}$`);
			const isImported = body.some((it) => {
				return namedTypes.ImportDeclaration.check(it) && regex.test(it.source.value);
			});
			if (isImported) return this.abort();
			
			const insertIndex = body.reduce((pre, cur, index) => {
				if (namedTypes.ImportDeclaration.check(cur)) pre = index + 1;
				return pre;
			}, 0);
			const importDeclaration = createImportDeclaration({ name: moduleName });
			body.splice(insertIndex, 0, importDeclaration);
			
			this.abort(); // 终止遍历
		},
	});
	recast.visit(sourceAST, {
		visitVariableDeclarator(path) {
			const node = path.node;
			if (node.id.name === 'API') {
				const isImported = getSpreadElement(node.init.properties, moduleName);
				if (!isImported) {
					const APISpreadElement = createSpreadElement({ name: moduleName });
					node.init.properties.push(APISpreadElement);
				}
				this.abort(); // 终止遍历
			}
			this.traverse(path); // 继续遍历
		},
	});
	
	return recast.print(sourceAST).code;
};