import Vue from 'vue';
import { Storage } from '@utils/utils';
import { Vc } from '@wya/vc';
import { serviceManager } from '@stores/services/utils';

/**
 * 是否已经登录
 */
const isLoggedIn = (nextState) => {
	let state = false; // 未登录
	let user = Storage.get(`user`);
	if (user) {
		state = true;
	}
	return state;
};

export const beforeEach = ((to, from, next) => {
	if (isLoggedIn() || to.path === '/login') {
		next();
		return;
	}
	next('/login');
});

export const afterEach = (route => {
});


/**
 * 设置登录状态
 * 
 * @param {*} data 
 * @param {*} opts 
 */
export const createLoginAuth = (data = {}, replace = true, opts = {}) => {

	_global.auth = data.auth || {};
	// 同步
	Vue.prototype.$global = _global;
	Vue.prototype.$auth = _global.auth;

	// todo	

};

/**
 * 清除登录状态
 * @param {*} opts 
 */
export const clearLoginAuth = (opts = {}) => {
	// 同步
	Vue.prototype.$global = _global;
	Vue.prototype.$auth = _global.auth;

	Vc.instance.cleanAll();
	serviceManager.clear();

	// todo

};

/**
 * 清除之前所有版本的缓存
 */
export const clearLocalStorage = (version) => {
	let keys = Object.keys(localStorage);
	for (let i = 0; i < keys.length; i++) {
		// @wya/vc 为vc组件库缓存，不清除
		if (!keys[i].includes(version) && !keys[i].includes('@wya/vc')) {
			Storage.remove(keys[i]); 
		}
	}
};