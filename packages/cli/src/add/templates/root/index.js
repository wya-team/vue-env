let targets = {
	...require('./api'),
	...require('./modules'),
	...require('./route'),
};

Object.keys(targets).forEach((key) => {
	exports[key] = targets[key];
});
