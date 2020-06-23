let targets = {
	...require('./api'),
	...require('./module'),
	...require('./mutation'),
	...require('./filter'),
	...require('./item'),
	...require('./list'),
	...require('./container'),
};

Object.keys(targets).forEach((key) => {
	exports[key] = targets[key];
});
