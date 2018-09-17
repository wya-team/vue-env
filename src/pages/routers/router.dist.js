/**
 * dist 未来用于服务端渲染
 */
import 'babel-polyfill';

/**
 * Vue
 */
import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';

/**
 * 全局变量 _global
 */
import './_global';

/**
 * 配置
 */
import SetTitle from '@common/set-title/set-title';
import emitter from '@extends/mixins/emitter';
import ajax from '@extends/plugins/ajax';

/**
 * vue-router Config
 */
import { routeConfig } from './routes';
import { beforeEach, afterEach } from './hooks';

/**
 * Vuex Config
 */
import { storeConfig } from '../stores/root';

Vue.config.productionTip = false;

// - 全局组件
Vue.component(SetTitle.name, SetTitle);

// - 全局mixins
Vue.mixin(emitter);

// - 全局plugins
Vue.use(ajax);

// - 路由
Vue.use(Router);
const router = new Router(routeConfig);
router.beforeEach(beforeEach);
router.afterEach(afterEach);

// - Vuex
Vue.use(Vuex);
const store = new Vuex.Store(storeConfig);

// - 同步
sync(store, router);

// - 实例
const app = new Vue({
	el: "#pages",
	router,
	store,
	template: "<div id='pages'><router-view></router-view></div>"
});

// 先不考虑服务端渲染情况
router.onReady(() => {
	app.$mount('#pages');
});

window.app = app;
