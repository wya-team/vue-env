import { Global } from './_global';

class HooksManager {
	/**
	 * @public
	 * 默认只分为两种情况，/login页面和非/login页面
	 * allow.regex: /^\/(login)$/
	 */
	beforeEach = async (to, from, next) => {
		if (/^(\/tpl\/)/.test(to.path)) {
			next();
			return;
		}

		let logged = Global.isLoggedIn();

		// 登录页
		if (to.path === '/login') {
			logged ? next('/') : next();
			return;
		}

		// 非登录页，已登录/未登陆
		logged ? next() : next('/login');
	}

	/**
	 * @public
	 */
	afterEach = (to, from) => {

	}
}

export default HooksManager;

