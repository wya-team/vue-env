import { cloneDeep } from 'lodash';
import Router from 'vue-router';
import { Storage } from '@utils/utils';
import Layout from '@components/layout/layout';
import Left from '@components/layout/left';
import Top from '@components/layout/top';
import { getChunks } from '@components/layout/menu/chunks';

class Manager {
	constructor(basicRoutes, dynamicRoutes) {
		this.basicRoutes = basicRoutes;
		this.dynamicRoutes = dynamicRoutes;

		this.router = null;
		this.config = this.init();
	}

	setRouter(router) {
		this.router = router;
	}

	/**
	 * 后端给的字段为power
	 */
	isLoggedIn() {
		return Storage.get(`user`);
	}

	/**
	 * 初始化路由，如果已经登录过，则生成有权限的路由配置文件，给Router
	 */
	init() {
		let routes = cloneDeep(this.basicRoutes);

		if (this.isLoggedIn()) {
			let children = this.getRoutes();
			let redirect = (children[0] || {}).path || '/404';

			routes.routes.push({
				path: '/',
				component: Layout,
				redirect,
				children
			});
		}
		return routes;
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

	getRoutes() {
		let dynamicRoutes = cloneDeep(this.dynamicRoutes);
		let allRoutes = getChunks().reduce((pre, cur) => {
			pre.push(...dynamicRoutes[cur.value]);
			return pre;
		}, []);


		let auth = this.isLoggedIn();

		// 筛选出有权限的路由
		let authRoutes = allRoutes.filter((route) => {
			// return auth[route.auth];
			return true;
		});

		let temp = [];
		let routes = authRoutes.reduce((pre, route) => {

			let redirect = this.getRedirect(route.path);

			if (redirect) {
				redirect.forEach((path) => {
					if (!temp.includes(path)) {
						temp.push(...redirect);
						pre.push({
							path,
							redirect: route.path
						});
					}
				});
			}

			// 普通路由
			let config = !route.components
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

			pre.push(config);
			return pre;
		}, []);

		return routes;
	}

	getRedirect(path) {
		let pathArr = path.split('/');
		let redirect;
		switch (pathArr.length) {
			case 4: // 三级导航
				redirect = [
					`/${pathArr[1]}`,
					`/${pathArr[1]}/${pathArr[2]}`
				];
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
}


let dynamicRoutes;
if (process.env.NODE_ENV !== "production") {
	dynamicRoutes = require('./routes.dev').dynamicRoutes;
} else {
	dynamicRoutes = require('./routes.dist').dynamicRoutes;
}
let basicRoutes;
if (process.env.NODE_ENV !== "production") {
	basicRoutes = require('./routes.dev').basicRoutes;
} else {
	basicRoutes = require('./routes.dist').basicRoutes;
}

export const routesManager = new Manager(basicRoutes, dynamicRoutes);
