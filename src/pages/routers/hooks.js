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
	let logged = isLoggedIn();

	/**
	 * /login页面
	 */
	if (to.path === '/login') {
		/**
		 * 可能无限重定向, 需要设定根域名不能重定向到`/login`
		 */
		logged ? next('/') : next();
		return;
	}

	/**
	 * 非/login页面
	 */
	if (logged) {
		next && next();
		return;
	}
});
export const afterEach = (route => {
});


/**
 * 设置登录状态
 * 
 * @param {*} data 
 * @param {*} opts 
 */
let landPage = `${location.pathname}${location.search}`;
export const createLoginAuth = (data = {}, replace = true, opts = {}) => {

	_global.auth = data.auth || {};
	// 同步
	Vue.prototype.$global = _global;
	Vue.prototype.$auth = _global.auth;

	// todo	
	Storage.set('user', data);
	window.routesManager.reset();

	// 首页或者一开始记录的页面
	window.app && window.app.$router.replace(landPage.replace(new RegExp(PRE_ROUTER_URL), '/'));
};

/**
 * 清除登录状态
 * @param {*} opts 
 */
export const clearLoginAuth = (opts = {}) => {
	// 同步
	Vue.prototype.$global = _global;
	Vue.prototype.$auth = _global.auth;

	Vc.instance.clearAll();
	Storage.remove('user');
	serviceManager.clear();

	// 重置页面
	landPage = `${location.pathname}${location.search}`;
	// 无权限页面
	window.app && window.app.$router.replace('/login');

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