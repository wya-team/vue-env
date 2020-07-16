/**
 * 全部变量初始化及使用, 不要随意引用其他模块，保证_global是最高级别变量
 */
import Vue from 'vue';
import { Device, Storage, Cookie } from '@wya/utils';
import { DEBUG, TOKEN_KEY, IN_BROWSER } from '../constants/constants';

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
			this.landingPage = `${location.origin}${location.pathname}${location.search}`;
			this.height = window.innerHeight;
			this.width = window.innerWidth;
		}
	}

	setVersion() {
		Storage.setVersion(this.version);
		Cookie.setVersion(this.version);
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


export const Global = new GlobalManager();

IN_BROWSER ? (window._global = Global) : (global._global = Global);

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
