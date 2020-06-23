const { getNewContent } = require('../utils/helper');

exports.api = (content, opts = {}) => {
	const { mutation, pathArr, project, obj } = opts;
	
	try {
		if (pathArr.includes('list') === false) {
			let importContent;
			let injectContent = `	${pathArr.join('_').toUpperCase()}_LIST_GET: '/test'`;

			let importSplit;
			let injectSplit = `\n};\n`;

			return getNewContent({
				content,
				importContent,
				injectContent,
				importSplit,
				injectSplit
			});
		} else {
			return content;
		}
	} catch (e) {
		console.log(e);
		return content;
	}
};

