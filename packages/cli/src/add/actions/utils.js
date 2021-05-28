const { builders, namedTypes } = require('ast-types');

// 创建一个空数组属性
const createArrayProp = (keyName, value = []) => {
	return builders.objectProperty(
		builders.identifier(keyName),
		builders.arrayExpression(value)
	);
};
// 创建字符串属性
const createStringProp = (keyName, value) => {
	return builders.objectProperty(
		builders.identifier(keyName),
		builders.stringLiteral(value)
	);
};

// 创建路由表达表达式
const createRouteExpression = ({ path }) => {
	return builders.objectExpression([
		createStringProp('path', path),
		createStringProp('name', path.split('/').slice(1).join('-')),
		createStringProp('title', ''),
		createArrayProp('children')
	]);
};

// 查找对象中某个属性的值, 返回的是node对象
const getPropValue = (properties, keyName) => properties.find((it) => it.key.name === keyName);

module.exports = {
	createStringProp,
	createArrayProp,
	createRouteExpression,
	getPropValue,
};