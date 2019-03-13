/**
 * ajax
 * @param  {[type]} url     地址
 * @param  {[type]} method  请求类型
 * @param  {[type]} body    请求的参数
 * @param  {Object} options 扩展
 */
import createHttpClient from '@wya/http';
import { Message } from '@wya/vc';
import API_ROOT from '@stores/apis/root';

const loadingFn = (options = {}) => {
	const { tipMsg } = options;
	Message.destroy();
	Message.loading(tipMsg || '加载中...', 0);
};
const loadedFn = () => {
	Message.destroy();
};

const otherFn = ({ response }) => {
	switch (response.status) {
		case -1:
			// clearLoginAuth();
			break;
		default:
			break;
	}
};

const beforeFn = ({ options }) => {
	// 可以是promise，不要随便写return
};
const afterFn = ({ options, response }) => {
	const { autoTip = false, errorMsg, successMsg } = options;
	// 可以是promise，不要随便写return
	switch (response.status) {
		case 0:
			autoTip && Message.error(errorMsg || response.msg);
			break;
		case 1:
			autoTip && Message.success(successMsg || response.msg);
			break;
		default:
			break;
	}
};

const globalOptions = {
	onLoading: loadingFn,
	onLoaded: loadedFn,
	onOther: otherFn,
	onBefore: beforeFn,
	onAfter: afterFn,
	apis: API_ROOT,
	debug: process.env.NODE_ENV !== 'production'
	// requestType: 'form-data:json'
};

export default createHttpClient(globalOptions);
