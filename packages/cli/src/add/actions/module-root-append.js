
const recast = require("recast");
const { namedTypes } = require('ast-types');
const { parserConfig } = require('./config');
const { createIdentifierProp, createImportDeclaration, getPropValue } = require('./utils');

/**
 * module/root.js 文件插入代码片段
 * @param {*} source 原文件内容
 */
module.exports = (source, opts) => {
	const { childName, stateName } = opts || {};
	const sourceAST = recast.parse(source, parserConfig);
	const regex = new RegExp(`${childName}$`);
	
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
				name: childName, 
				variableName: stateName,
				isDefault: false, 
			});
			if (!isImported) {
				objectProperty = createIdentifierProp(stateName);
				properties.push(objectProperty);
				if (lastImportPath) {
					lastImportPath.insertAfter(importDeclaration);
				} else {
					path.insertBefore(importDeclaration);
				}
			}
			this.abort(); // 终止遍历
		},
	});
	
	// prettyPrint会将源文件格式转换掉，这里可以使用，其他不建议使用
	return recast.prettyPrint(sourceAST, { useTabs: true, tabWidth: 4 }).code.replace(/\s{5}/g, "\n\t");
};