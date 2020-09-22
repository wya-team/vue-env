const path = require('path');
const upath = require('upath');
const fs = require('fs-extra');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');


exports.localhost = (() => {
	const ips = [];
	const os = require('os');
	const ntwk = os.networkInterfaces();
	for (const k in ntwk) {
		for (let i = 0; i < ntwk[k].length; i++) {
			const _add = ntwk[k][i].address;
			if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
				ips.push(ntwk[k][i].address);
			}
		}
	}
	return ips[0] || 'localhost';
})();

const getEntryFileContent = (entryPath, fullpath) => {
	let relativePath = path.relative(path.join(entryPath, '../'), fullpath);
	relativePath = upath.normalize(relativePath);
	let contents = '';
	contents += `\nimport Vue from 'vue';\n`;
	contents += `\nimport App from '${relativePath.replace(/\.vue/, '')}';\n`;
	contents += `\nVue.config.devtools = true;\n`;
	contents += `\nconst app = new Vue({`;
	contents += `\n	el: "#pages",`;
	contents += `\n	components: { App },`;
	contents += `\n	template: '<App />'`;
	contents += `\n});\n`;
	contents += `\nwindow.app = app;`;
	return contents;
};

const getPathInfo = (fullpath) => {
	const stat = fs.statSync(fullpath);
	const extname = path.extname(fullpath);
	const dirname = path.dirname(fullpath);
	const basename = path.basename(fullpath);
	const isDirectory = stat.isDirectory();

	return {
		stat,
		extname,
		dirname,
		basename,
		isDirectory,
		baseDir: isDirectory ? fullpath : dirname, 
		fullname: path.join(dirname, basename),
		isSFC: stat.isFile() && (/\.(js|vue)$/.test(extname))
	};
};
exports.getPathInfo = getPathInfo;

let entry = {};
const generate = (fullpath) => {
	const { dirname, basename, extname, isSFC } = getPathInfo(fullpath);

	if (!isSFC) {
		return;
	}

	// 用户测试单独文件
	const entryFile = path
		.resolve(dirname, './.temp', basename)
		.replace(/\.vue/, '.js');

	const content = getEntryFileContent(entryFile, fullpath);
	
	fs.outputFileSync(entryFile, content);

	entry[basename] = entryFile;
};

const getHTMLConfig = () => {
	let htmls = [];
	let openPage = {};
	Object.keys(entry).forEach((key) => {
		let fullpath = entry[key];
		openPage[key] = `/demo/${key}`.replace(/\.js/, '.html');
		htmls.push(
			new HtmlWebpackPlugin({
				__DEV__: true, 
				template: path.resolve(__dirname, 'templates/tpl.ejs'),
				chunks: [key],
				inject: 'body',
				filename: `demo/${key.replace(/\.js/, '.html')}`
			})
		);
	});
	htmls.push(
		new HtmlWebpackPlugin({
			inject: false,
			title: `All Demo`,
			publicPath: '',
			openPage,
			template: path.resolve(__dirname, 'templates/index.ejs'),
		})
	);
	return {
		htmls,
		openPage
	};
};

exports.getEntryFile = (directory) => {
	const stat = fs.statSync(directory);

	if (stat.isFile()) {
		generate(directory);
	} else if (stat.isDirectory()) {
		fs.readdirSync(directory).forEach((file) => generate(path.join(directory, file)));
	}

	return {
		entry,
		...getHTMLConfig()
	};
};