import { cloneDeep } from 'lodash';
import Router from 'vue-router';
import { Storage } from '@utils/utils';
import { TOKEN_KEY } from '@constants/constants';
import Layout from '@components/layout/layout';
import Left from '@components/layout/left';
import Top from '@components/layout/top';
/**
 * 用于排序
 */
import { getChunks } from '@components/layout/menu/chunks';
import { Global } from './_global';

class RoutesManager {
	constructor() {
		let { basicRoutes, layoutRoutes, dynamicRoutes } = process.env.NODE_ENV !== "production"
			? require('./routes.dev')
			: require('./routes.dist');

		this.basicRoutes = basicRoutes || {};
		this.layoutRoutes = layoutRoutes || {};
		this.dynamicRoutes = dynamicRoutes || {};

		this.router = null;
		this.config = this._init();
	}

	setRouter(router) {
		this.router = router;
	}

	/**
	 * 初始化路由，如果已经登录过，则生成有权限的路由配置文件，给Router
	 */
	_init() {
		let config = cloneDeep(this.basicRoutes);
		let children = Global.isLoggedIn() ? this.getRoutes() : this.getRoutes(this.layoutRoutes);
		let redirect = (children[0] || {}).path || '/404';

		config.routes.push({
			path: '/',
			component: Layout,
			redirect,
			children
		});

		return config;
	}

	/**
	 * 一开始没有登录，路由只有/login，登录之后，动态添加
	 */
	reset() {
		// 重新获得有权限的路由
		let children = this.getRoutes() || [];
		let redirect = (children[0] || {}).path || '/404';
		let newRouter = new Router(this.basicRoutes);
		this.router.matcher = newRouter.matcher; // the relevant part
		this.router.addRoutes(
			[
				{
					path: '/',
					component: Layout,
					redirect,
					children
				}
			]
		);
	}

	getRoutes(targetRoutes) {
		targetRoutes = cloneDeep(targetRoutes || { ...this.layoutRoutes, ...this.dynamicRoutes });

		let allRoutes = getChunks().reduce((pre, cur) => {
			targetRoutes[cur.value] && pre.push(...targetRoutes[cur.value]);
			return pre;
		}, []);

		// 筛选出有权限的路由
		let authRoutes = allRoutes.filter((route) => {
			// return Global.auth[route.auth];
			return true;
		});

		let temp = [];
		let routes = authRoutes.reduce((pre, route) => {
			// 一、二级路由url如果页面，则不做redirect
			if (route.path.split('/').length < 4) {
				temp.push(route.path);
			}
			let redirect = this.getRedirect(route.path);
			
			if (redirect) {
				redirect.forEach((path) => {
					if (!temp.includes(path)) {
						temp.push(path);
						pre.push({
							path,
							redirect: route.path
						});
					}
				});
			}

			pre.push(this.rebuildRoute(route));
			return pre;
		}, []);

		return routes;
	}

	getRedirect(path) {
		let pathArr = path.split('/');
		let redirect;
		switch (pathArr.length) {
			case 4: // 三级导航
				// 动态路由不做redirect
				if (!/^:([a-z]|[A-Z])+\?/.test(pathArr[3])) {
					redirect = [
						`/${pathArr[1]}`,
						`/${pathArr[1]}/${pathArr[2]}`
					];
				}
				break;
			case 3: // 二级导航
				redirect = [
					`/${pathArr[1]}`
				];
				break;
			default: 
				break;
		}

		return redirect;
	}

	rebuildRoute(route) {
		return !route.components || route.redirect
			? route
			: {
				...route,
				components: {
					default: () => ({
						component: route.components[0]()
					}),
					left: route.components.includes('left') && Left,
					top: route.components.includes('top') && Top,
				}
			};
	}
}
export default RoutesManager;
