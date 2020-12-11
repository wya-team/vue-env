const { getNewContent, camelCase } = require('../utils/helper');

exports.rootApi = (content, opts = {}) => {
	const { mutation, pathArr, componentArr, obj } = opts;
	try {
		let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
		let pathName = `${pathArr.slice(1).join('-')}`;

		let mutationKey = camelCase(mutation);
		let importContent = `import ${mutationKey} from './${mutation}';`;
		let injectContent = `	...${mutationKey}`;

		let importSplit = `\nconst API = {\n`;
		let injectSplit = `\n};\n`;

		return getNewContent({
			content,
			importContent,
			injectContent,
			importSplit,
			injectSplit
		});
	} catch (e) {
		console.log(e);
		return content;
	}
};

