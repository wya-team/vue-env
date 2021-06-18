const babelParser = require('@babel/parser');

const parserConfig = { 
	parser: babelParser,
}; // recast内置Esprima，不支持import语法

module.exports = {
	parserConfig
};