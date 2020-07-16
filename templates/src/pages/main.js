/**
 * vc可以被重置
 */
import '@wya/vc/lib/vc.min.css';
import '../css/global.scss';

import { createApp } from './routers/router';

const { app, router, routesManager } = createApp();

// 先不考虑服务端渲染情况
router.onReady(() => {
	app.$mount('#pages');
});

window.app = app;
window.routesManager = routesManager;

