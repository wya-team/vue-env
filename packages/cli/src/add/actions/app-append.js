
const recast = require("recast");
const { parserConfig } = require('./config');
const { 
	createArrayProp,
	createRouteExpression,
	getPropValue,
} = require('./utils');

/**
 * 往对象里面加children: []
 */
const getChildren = (properties) => {
	let children = getPropValue(properties, 'children');
	if (!children) {
		children = createArrayProp('children');
		properties.push(children);
	}
	return children;
};

/**
 * 往一级的children中加二级导航
 */
const getSecondNav = (children, route) => {
	// 找到二级导航对象
	let navExpression = children.find(it => getPropValue(it.properties, 'path').value.value === route);
	if (!navExpression) {
		navExpression = createRouteExpression({ path: route });
		children.push(navExpression);
	}
	return navExpression;
};

/**
 * app.js 文件插入代码片段
 * @param {*} source 原文件内容
 * @param {*} fragment 插入的代码片段
 */
module.exports = (source, fragment, opts) => {
	const { isNav, moduleName } = opts || {};
	const sourceAST = recast.parse(source, parserConfig);
	const fragmentAST = recast.parse(fragment, parserConfig);
	const normalVarName = `${moduleName}Config`;
	const navVarName = `${moduleName}NavConfig`;
	const fragmentObjExpression = fragmentAST.program.body[0].declaration;
	recast.visit(sourceAST, {
		visitVariableDeclarator(path) {
			const node = path.node;
			if (!isNav && node.id.name === normalVarName) {
				node.init.elements.push(fragmentObjExpression);
				return this.abort(); // 停止遍历
			} else if (isNav && node.id.name === navVarName) {
				const routePath = fragmentObjExpression.properties.find((it) => it.key.name === 'path').value.value;
				let navLevel = routePath.split('/').length - 1;
				
				if (navLevel <= 1) {
					node.init = fragmentObjExpression; // 替换掉
				} else {
					const properties = node.init.properties;
					const children = getChildren(properties).value.elements;

					if (navLevel === 2) { // 二级导航
						children.push(fragmentObjExpression);
					} else if (navLevel === 3) { // 3级导航
						const secondRoute = routePath.split('/').slice(0, 3).join('/'); // 二级路由
						const secondNav = getSecondNav(children, secondRoute);
						const thirdChildren = getChildren(secondNav.properties).value.elements;
						thirdChildren.push(fragmentObjExpression);
					}
				}
				return this.abort();
			}
			this.traverse(path); // 继续遍历
		}
	});
	
	return recast.print(sourceAST).code;
};