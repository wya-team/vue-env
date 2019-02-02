const { resolve } = require('path');
const fs = require('fs-extra');

const hasOther = (module) => {
	let fullpath = resolve(__dirname, `../../src/pages/containers/${module}/app.js`);

	return (fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '').includes('OtherConfig');
};

const routes = (opts = {}) => {
	const { modules } = opts;
	let contents = '';
	contents += `import Vue from 'vue';\n`;
	contents += `import layout from '@components/layout/layout';\n`;
	contents += `import { PRE_ROUTER_URL } from '../constants/constants';\n`;
	contents += `import { loginConfig } from '../containers/login/app';\n`;
	modules.forEach((item) => {
		let _item = item === '__tpl__' ? 'tpl' : item;
		hasOther(_item) 
			? contents += `import { ${_item}Config, ${_item}OtherConfig } from '../containers/${item}/app';\n`
			: contents += `import { ${_item}Config } from '../containers/${item}/app';\n`;
	});
	contents += `\n`;
	contents += `export default {\n`;
	contents += `	base: PRE_ROUTER_URL,\n`;
	contents += `	mode: 'history',\n`;
	contents += `	routes: [\n`;
	contents += `		...loginConfig,\n`;
	modules.forEach((item) => {
		let _item = item === '__tpl__' ? 'tpl' : item;
		hasOther(_item) && (contents += `		...(${_item}OtherConfig || {}),\n`);
	});
	contents += `		{\n`;
	contents += `			path: '/',\n`;
	contents += `			component: layout,\n`;
	contents += `			redirect: '/${modules[0] || 'login'}',\n`;
	contents += `			children: [\n`;
	modules.forEach((item, index) => {
		let _item = item === '__tpl__' ? 'tpl' : item;
		contents += `				...${_item}Config${index === modules.length - 1 ? '' : ','}\n`;
	});
	contents += `			]\n`;
	contents += `		},\n`;
	contents += `		{\n`;
	contents += `			path: '*',\n`;
	contents += `			redirect: (to) => {\n`;
	contents += `				return '/login';\n`;
	contents += `			}\n`;
	contents += `		}\n`;
	contents += `	]\n`;
	contents += `};\n`;
	return contents;
};
module.exports = {
	routes
};



