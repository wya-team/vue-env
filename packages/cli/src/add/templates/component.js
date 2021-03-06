exports.component = (opts = {}) => {
	const { mutation, pathArr, project, obj, title } = opts;
	let contents = '';

	contents += `<template>\n`;
	contents += `	<div>\n`;
	contents += `		__tpl__, ${pathArr.join('-')} ${title}\n`;
	contents += `	</div>\n`;
	contents += `</template>\n\n`;

	contents += `<script>\n\n`;
	contents += `export default {\n`;
	contents += `	name: '${project}-${pathArr.join('-')}-content',\n`;
	contents += `	components: {\n`;
	contents += `	},\n`;
	contents += `	data() {\n`;
	contents += `		return {\n`;
	contents += `		};\n`;
	contents += `	},\n`;
	contents += `	created() {\n`;
	contents += `	},\n`;
	contents += `	methods: {\n`;
	contents += `	},\n`;
	contents += `};\n`;
	contents += `</script>\n\n`;
	contents += `<style lang="scss">\n`;
	contents += `</style>\n`;
	return contents;
};
