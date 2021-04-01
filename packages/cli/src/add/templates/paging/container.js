exports.container = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, pagingType: type, title } = opts;
	let contents = '';
	contents += `<template>\n`;
	contents += `	<set-title title="${title}" style="padding: 24px">\n`;
	contents += `		<${project}-filter />\n`;
	contents += `		<${project}-${type === 'tabs' ? 'tabs-' : ''}list />\n`;
	contents += `	</set-title>\n`;
	contents += `</template>\n`;
	contents += `\n`;
	contents += `<script>\n`;
	contents += `import ${type === 'tabs' ? 'Tabs' : ''}List from '@components/${mutation}/${pathArr.slice(1).join("-")}/${type === 'tabs' ? 'tabs-' : ''}list';\n`; // eslint-disable-line
	contents += `import Filter from '@components/${mutation}/${pathArr.slice(1).join("-")}/filter';\n`;
	contents += `import navigator from '@extends/mixins/navigator';\n`;
	contents += `\n`;
	contents += `export default {\n`;
	contents += `	name: '${project}-${pathArr.join("-")}',\n`;
	contents += `	components: {\n`;
	contents += `		"${project}-${type === 'tabs' ? 'tabs-' : ''}list": ${type === 'tabs' ? 'Tabs' : ''}List,\n`;
	contents += `		"${project}-filter": Filter,\n`;
	contents += `	},\n`;
	contents += `	mixins: [navigator('${pathArr.join('_').toUpperCase()}')],\n`;
	// contents += `	data() {\n`;
	// contents += `		return {\n`;
	// contents += `		};\n`;
	// contents += `	},\n`;
	// contents += `	created() {\n`;
	// contents += `	},\n`;
	// contents += `	methods: {\n`;
	// contents += `	},\n`;
	contents += `};\n`;
	contents += `</script>\n`;
	contents += `\n`;
	// contents += `<style lang="scss">\n`;
	// contents += `</style>\n`;
	return contents;
};
