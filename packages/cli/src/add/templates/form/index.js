let targets = {
	...require('./container'),
	...require('./component')
};

Object.keys(targets).forEach((key) => {
	exports[key] = targets[key];
});