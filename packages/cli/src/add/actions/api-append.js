
const recast = require("recast");
const { parserConfig } = require('./config');
const { createStringProp } = require('./utils');

/**
 * api.js 文件插入代码片段
 * @param {*} source 原文件内容
 */
module.exports = (source, opts) => {
	const { template, APIName } = opts || {};
	const sourceAST = recast.parse(source, parserConfig);
	
	const API_KEY_ARRAY = [];
	// visit是按顺序执行的
	recast.visit(sourceAST, {
		visitIdentifier(path) {
			const node = path.node;
			node.name !== 'api' && API_KEY_ARRAY.push(node.name);
			this.traverse(path); // 继续遍历
		}
	});

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
				if (API_KEY_ARRAY.includes(key)) return this.abort(); // 终止遍历
				const APIObjectProperty = createStringProp(key, value);
				node.init.properties.push(APIObjectProperty);
				return this.abort(); // 终止遍历
			}
			this.traverse(path); // 继续遍历
		}
	});
	
	return recast.print(sourceAST).code;
};