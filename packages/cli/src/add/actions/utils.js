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

// 创建单个名称的属性，key和value一样，{ name }
const createIdentifierProp = (keyName) => {
	return builders.objectProperty.from({ 
		shorthand: true,
		key: builders.identifier(keyName),
		value: builders.identifier(keyName),
	});
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

const createSpreadElement = ({ name }) => {
	return builders.spreadElement(builders.identifier(name));
};

const createImportDeclaration = ({ name, variableName, importPath, isDefault = true }) => {
	let importSpecifier;
	importPath = importPath || `./${name}`;
	if (isDefault) {
		importSpecifier = [builders.importDefaultSpecifier(builders.identifier(name))];
	} else {
		importSpecifier = [builders.importSpecifier(builders.identifier(variableName))];
	}
	return builders.importDeclaration(
		importSpecifier,
		builders.stringLiteral(importPath)
	);
};

const createIdentifier = ({ name }) => {
	return builders.identifier(name);
};

// 查找对象中某个属性的值, 返回的是node对象
const getPropValue = (properties, keyName) => properties.find((it) => it.key.name === keyName);
/**
 * 获取解构对象
 * lg: const API = {...setting}, 查找是否存在setting; getSpreadElement(API, 'setting')
 * @param {*} properties 
 * @param {*} keyName 
 * @returns 
 */
const getSpreadElement = (properties, keyName) => properties.find((it) => it.argument.name === keyName);

module.exports = {
	createStringProp,
	createIdentifierProp,
	createArrayProp,
	createRouteExpression,
	createSpreadElement,
	createImportDeclaration,
	createIdentifier,
	getPropValue,
	getSpreadElement
};