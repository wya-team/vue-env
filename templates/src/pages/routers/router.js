/**
 * Vue
 */
import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import { Vc } from '@wya/vc';
import AssistVc, { Extends } from '@wya/assist-vc';
import { sync } from 'vuex-router-sync';

/**
 * 全局变量 _global, 不要动
 */
import globalHook, { Global, setApp } from './_global'; // eslint-disable-line

/**
 * 配置
 */
import { Loading } from '@common';
import request from '@extends/plugins/request';
import VcConfig from './vc.config';
import scrollBehavior from './scroll-behavior';

/**
 * Vuex Config
 */
import { storeConfig } from '../stores/root';

import HooksManager from './hooks';
import RoutesManager from './routes.dynamic';

export const createApp = () => {
	const routesManager = new RoutesManager();
	const hooksManager = new HooksManager();

	const { beforeEach, afterEach } = hooksManager;

	Vue.config.productionTip = false;
	Vue.config.devtools = Global.debug;

	// - 全局组件
	Vue.component(Loading.name, Loading);

	// 辅助组件
	Vue.use(AssistVc);
	
	// - 全局mixins
	Vue.mixin(Extends.mixins(['emitter']));

	// - 全局plugins
	Vue.use(request);

	// - 全局global对象
	Vue.use(globalHook);

	// - 路由
	Vue.use(Router);

	const router = new Router({ ...routesManager.config, scrollBehavior });

	routesManager.setRouter(router);

	router.beforeEach(beforeEach);
	router.afterEach(afterEach);
	router.onError((error) => {
		if (error.message.match(/Loading chunk (\d)+ failed/g)) {
			location.reload(true);
		}
	});

	// - Vuex
	Vue.use(Vuex);
	const store = new Vuex.Store(storeConfig);

	// - 全局@wya/vc实例
	Vue.use(Vc, VcConfig({ store, router }));

	// - 同步
	sync(store, router);

	// - 实例
	const app = new Vue({
		el: "#pages",
		router,
		store,
		render(h) {
			return (
				<div id="pages">
					<router-view />
				</div>
			);
		}
	});

	const result = {
		app,
		router,
		store,
		routesManager,
	};
	setApp(result);
	return result;
};