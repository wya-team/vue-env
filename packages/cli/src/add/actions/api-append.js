
const recast = require("recast");
const recastParser = require('@babel/parser');
const { createStringProp } = require('./utils');

/**
 * app.js 文件插入代码片段
 * @param {*} source 原文件内容
 */
module.exports = (source, opts) => {
	const { template, APIName } = opts || {};
	const parserConfig = { parser: recastParser }; // recast内置Esprima，但不支持import语法
	const sourceAST = recast.parse(source, parserConfig);
	
	recast.visit(sourceAST, {
		visitVariableDeclarator(path) {
			const node = path.node;
			if (node.id.name === 'api') {
				let key = `${APIName.toUpperCase()}_GET`;
				let value = '';
				if (['paging', 'scroll'].includes(template)) {
					key = `${APIName.toUpperCase()}_LIST_GET`;
					value = '/test';
				}
				const APIObjectProperty = createStringProp(key, value);
				node.init.properties.push(APIObjectProperty);
				return this.abort(); // 终止遍历
			}
			this.traverse(path); // 继续遍历
		}
	});
	
	return recast.print(sourceAST).code;
};