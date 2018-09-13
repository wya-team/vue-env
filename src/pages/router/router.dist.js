/**
 * dist 未来用于服务端渲染
 */
import 'babel-polyfill';
import Vue from 'vue';
import Router from 'vue-router';
import SetTitle from '@common/set-title/set-title';
import emitter from '@extends/mixins/emitter';
import ajax from '@extends/plugins/ajax';
import { routeConfig } from './routes';
import { beforeEach, afterEach } from './hooks';
import { PRE_ROUTER_URL } from '../constants/constants';

// 全局变量 _global
import './_global';

Vue.config.productionTip = false;

// 全局组件
Vue.component(SetTitle.name, SetTitle);
// --end

// 全局mixins
Vue.mixin(emitter);
// --end

// 全局plugins
Vue.use(ajax);
// --end

// -- 路由
Vue.use(Router);
const router = new Router(routeConfig);
router.beforeEach(beforeEach);
router.afterEach(afterEach);
// -- end

// 视图
const app = new Vue({
	el: "#pages",
	router,
	template: "<div id='pages'><router-view></router-view></div>"
});

// 先不考虑服务端渲染情况
router.onReady(() => {
	app.$mount('#pages');
});

window.app = app;

