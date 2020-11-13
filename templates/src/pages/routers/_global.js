/**
 * 全部变量初始化及使用, 不要随意引用其他模块，保证_global是最高级别变量
 */
import Vue from 'vue';
import { Device, Storage, Cookie } from '@wya/utils';
import { Vc } from '@wya/vc';
import { serviceManager } from '@stores/services/utils';
import { DEBUG, TOKEN_KEY, IN_BROWSER, PRE_ROUTER_URL } from '../constants/constants';

/* eslint-disable import/no-mutable-exports */
let app = null; 
let routesManager = null;
/* eslint-enable */

class GlobalManager {
	constructor() {
		// 版本号
		this.version = '1.0';
		this.setVersion();

		// GUID
		this.GUID = '';

		// 程序打开时间
		this.landingTime = new Date();

		/**
		 * ios中微信支付的坑
		 * 获取第一次加载的页面pathname值
		 */
		this.landingPath = '';
		this.landingPage = '';

		// 用户信息
		this.user = {};

		// 环境
		this.env = process.env.NODE_ENV;
		this.debug = DEBUG;

		// 缩放比例
		this.scale = 1;
		this.height = 0;
		this.width = 0;

		// 设备信息状态
		this.device = Device;

		if (IN_BROWSER) {
			this.GUID = location.host.split(".")[0];
			this.landingPath = location.pathname;
			this.landingRoute = `${location.pathname}${location.search}`;
			this.landingPage = `${location.origin}${location.pathname}${location.search}`;
			this.height = window.innerHeight;
			this.width = window.innerWidth;
		}
	}

	setVersion() {
		Storage.setVersion(this.version);
		Cookie.setVersion(this.version);
	}

	/**
	 * 是否已经登录
	 */
	isLoggedIn(opts = {}) {
		return !!Storage.get(TOKEN_KEY);
	}
	
	/**
	 * @public
	 * 设置登录状态, 开发模式下用的
	 */
	createLoginAuth(user, replace = true, opts = {}) {
		this.updateUser(user);

		routesManager.reset();

		// 首页或者一开始记录的页面
		let path = this.landingRoute.replace(new RegExp(PRE_ROUTER_URL), '/');
		path = /^\/login/.test(path) ? '/' : path;

		app.$router.replace(path);
	}

	/**
	 * @public
	 * 清除登录状态
	 */
	clearLoginAuth(opts = {}) {
		this.clearUser();
		Vc.instance.clearAll();
		serviceManager.clear();

		// 重置页面
		this.landingPage = `/`;

		/**
		 * 清理缓存后，跳转至login(即授权或模拟登录)
		 */
		app.$router.replace('/login');
	}

	updateUser(override = {}, opts = {}) {
		this.user = {
			...this.user,
			...override,
		};

		Vue.prototype.$global = this;
		Vue.prototype.$user = this.user;
		Vue.prototype.$config = this.user.config;
		Vue.prototype.$auth = this.user.auth;

		Storage.set(TOKEN_KEY, this.user);
	}

	clearUser() {
		this.user = {};
		// 同步
		Vue.prototype.$global = this;
		Vue.prototype.$auth = {};
		Vue.prototype.$user = {};
		Vue.prototype.$config = {};

		Storage.remove(TOKEN_KEY);
	}
}
const Global = new GlobalManager();

if (DEBUG) {
	window._global = Global;
}

export const getApp = () => app;
export const getRoutesManager = () => routesManager;
export const setApp = (opts) => {
	const { app: $1, routesManager: $2 } = opts;

	app = $1;
	routesManager = $2;

	if (DEBUG) {
		window.app = $1;
		window.routesManager = $2;
	}
};

export { Global };
export default {
	install($Vue) {
		$Vue.prototype.$global = Global;
		/**
		 * 总后台返回的权限
		 */
		$Vue.prototype.$auth = Global.user.auth;
		/**
		 * 总后台返回的控制项
		 */
		$Vue.prototype.$config = Global.user.config;
	}
};
