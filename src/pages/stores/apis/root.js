import { objRegex, getParseUrl } from '@utils/utils';
import { DEV_WITH_SERVER } from '../../constants/constants';
import __tpl__ from './__tpl__';
import _common from './_common';
import login from './login';

const API = {
	...__tpl__,
	..._common,
	...login,
};

let baseUrl;

/* global __DEV__ */
if (__DEV__) {
	// 开发环境
	if (!DEV_WITH_SERVER) {
		// 前端自模拟 只限mock
		baseUrl = 'http://localhost:3000';
	} else {
		// 后端数据
		baseUrl = 'https://uuid.ruishan666.com';
	}
} else {
	// 生产环境
	baseUrl = `${location.origin}`;
}

let protocol = baseUrl.match(/(\w+):/)[0];
let domain = baseUrl.split('.').slice(-2).join('.');

for (let i in API) {
	if (objRegex.validURLScheme.regex.test(API[i])) {

		API[i] = API[i];

	} else if (__DEV__ && !DEV_WITH_SERVER) {

		API[i] = baseUrl + API[i];

	} else if (typeof API[i] === 'string') {

		let path = API[i].split('/');
		API[i] = `${protocol}//${path[1]}.${domain}/${path.slice(2).join('/')}`;

	} else if (typeof API[i] === 'object') {
		// todo
	}
}
export default API;
