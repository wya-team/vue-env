const APP_ROOT = process.cwd();
const path = require('path');

module.exports = {
	cacheDirectory: true, // 启用编译缓存
	presets: [
		"env",
		"stage-0"
	],
	plugins: [
		[
			"transform-vue-jsx"
		],
		[
			"transform-decorators-legacy"
		],
		[
			"import",
			[
				{
					libraryName: "wya-vc",
					libraryDirectory: "lib"
				},
				{
					libraryName: "iview",
					customName: (name) => {
						// 可能会存在编译缓存，rm -rf ./node_modules/.cache
						// if (name === 'cascader') {
						// 	return path.resolve(APP_ROOT, `src/pages/components/_common/iview-reset/${name}`)
						// }
						return `iview/src/components/${name}`;
					}
				}
			]
		]
	]
};