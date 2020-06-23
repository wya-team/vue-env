let targets = {
	...require('./router'),
	...require('./api'),
	...require('./container'),
	...require('./component'),
	...require('./mutation'),
	...require('./module'),
	...require('./rootModule'),
};

Object.keys(targets).forEach((key) => {
	exports[key] = targets[key];
});