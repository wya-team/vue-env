const { getNewContent, camelCase } = require('../utils/helper');

exports.rootModules = (content, opts = {}) => {
	const { mutation, pathArr, componentArr, obj } = opts;
	try {
		let mutationKey = camelCase(mutation);
		let importContent = `import ${mutationKey} from './${mutation}/root';`;
		let injectContent = `	...${mutationKey}`;

		let importSplit = `\nexport default {\n`;
		let injectSplit = `\n};\n`;

		return getNewContent({
			content,
			importContent,
			injectContent,
			importSplit,
			injectSplit
		});
	} catch (e) {
		return content;
	}
};
