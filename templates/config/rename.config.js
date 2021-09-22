/**
 * 由于TIMESTAMP的随机性，造成第二次打包使用了之前缓存的资源，会出现多个static文件夹
 * 所以在打包成功后在重新命名文件夹
 */

const fs = require('fs');
const chalk = require('chalk');
const { resolve } = require('path');

const TIMESTAMP = new Date().getTime();
const newFolderName = `static.${TIMESTAMP}`;
const OLD_FOLDER_PATH = resolve(__dirname, '../dist/static');
const NEW_FOLDER_PATH = resolve(__dirname, `../dist/${newFolderName}`);
fs.rename(OLD_FOLDER_PATH, NEW_FOLDER_PATH, (err) => {
	if (err) throw err;
	console.log(chalk`{green 打包资源存放在：${newFolderName}}`);
});