import '@babel/polyfill';

/**
 * Vue
 */
import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import { Vc } from '@wya/vc';
import { sync } from 'vuex-router-sync';

/**
 * 配置
 */
import SetTitle from '@common/set-title/set-title';
import Loading from '@common/loading/loading';
import emitter from '@extends/mixins/emitter';
import request from '@extends/plugins/request';
import VcConfig from './vc.config';

/**
 * 全局变量 _global
 */
import _global from './_global';

/**
 * vue-router Config
 */
let routeConfig;
if (process.env.NODE_ENV !== "production") {
	routeConfig = require('./routes.dev').default;
} else {
	routeConfig = require('./routes.dist').default;
}
import { beforeEach, afterEach } from './hooks';

/**
 * Vuex Config
 */
import { storeConfig } from '../stores/root';

Vue.config.productionTip = false;

// - 全局组件
Vue.component(SetTitle.name, SetTitle);
Vue.component(Loading.name, Loading);

// - 全局mixins
Vue.mixin(emitter);

// - 全局plugins
Vue.use(request);

// - 全局global对象
Vue.use(_global);

// - 路由
Vue.use(Router);
const router = new Router(routeConfig);
router.beforeEach(beforeEach);
router.afterEach(afterEach);

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
				<router-view></router-view>
			</div>
		);
	}
});

// 先不考虑服务端渲染情况
router.onReady(() => {
	app.$mount();
});

window.app = app;
