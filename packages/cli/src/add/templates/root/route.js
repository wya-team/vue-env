const { getNewContent, camelCase } = require('../utils/helper');

exports.rootRoute = (content, opts = {}) => {
	const { mutation, pathArr, componentArr, obj } = opts;
	try {
		let mutationKey = camelCase(mutation);
		let importContent = `import { ${mutationKey}Config } from '../containers/${mutation}/app';`;
		let injectContent = `				...${mutationKey}Config`;

		let importSplit = `\nexport default {\n`;
		let injectSplit = `\n			]\n		},\n`;

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
