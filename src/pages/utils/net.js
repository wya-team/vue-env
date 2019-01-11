/**
 * ajax
 * @param  {[type]} url     地址
 * @param  {[type]} method  请求类型
 * @param  {[type]} body    请求的参数
 * @param  {Object} options 扩展
 */
import { ajaxFn } from 'wya-fetch';
import { Message } from 'iview';
import API_ROOT from '@stores/apis/root';

const loadingFn = (options = {}) => {
	const { tipMsg } = options;
	Message.destroy();
	Message.loading(tipMsg || '加载中...', 0);
};
const loadedFn = () => {
	Message.destroy();
};

const otherFn = (res, resolve, reject) => {
	switch (res.status) {
		case -1:
			// clearLoginAuth();
			break;
		default:
			break;
	}
};

const beforeFn = (options) => {
	// 可以是promise，不要随便写return
};
const afterFn = (res, options = {}) => {
	const { autoTip = false, errorMsg, successMsg } = options;
	// 可以是promise，不要随便写return
	switch (res.status) {
		case 0:
			autoTip && Message.error(errorMsg || res.msg);
			break;
		case 1:
			autoTip && Message.success(successMsg || res.msg);
			break;
		default:
			break;
	}
};

const defaultOptions = {
	onLoading: loadingFn,
	onLoaded: loadedFn,
	onOther: otherFn,
	onBefore: beforeFn,
	onAfter: afterFn,
	apis: API_ROOT,
	// requestType: 'form-data:json'
};

const ajax = ajaxFn(defaultOptions);
const net = {
	ajax
};
export default net;
