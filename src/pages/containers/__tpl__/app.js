export const tplConfig = [
	{
		path: '/tpl',
		redirect: '/tpl/main'
	},
	{ 
		path: '/tpl/main', 
		name: 'tpl-main',
		component: () => import('./modules/tpl-main.vue'),
	},
	{ 
		path: '/tpl/basic', 
		name: 'tpl-basic',
		component: () => import('./modules/tpl-basic.vue') 
	},

	{ 
		path: '/tpl/request', 
		name: 'tpl-request',
		component: () => import('./modules/tpl-request.vue') 
	},
	// 表单
	{ 
		path: '/tpl/form', 
		name: 'tpl-form',
		component: () => import('./modules/tpl-form.vue') 
	},
	{ 
		path: '/tpl/paging/basic', 
		name: 'tpl-paging-basic',
		component: () => import('./modules/tpl-paging-basic.vue') 
	},
	{ 
		path: '/tpl/paging/tabs', 
		name: 'tpl-paging-tabs',
		component: () => import('./modules/tpl-paging-tabs.vue') 
	},
	{ 
		path: '/tpl/paging/async', 
		name: 'tpl-paging-async',
		component: () => import('./modules/tpl-paging-async.vue') 
	},
	{ 
		path: '/tpl/paging/piece', 
		name: 'tpl-paging-piece',
		component: () => import('./modules/tpl-paging-piece.vue') 
	},
	{ 
		path: '/tpl/paging/native/demo1', 
		name: 'tpl-paging-native-demo1',
		component: () => import('./modules/tpl-paging-native.vue') 
	},
	{ 
		path: '/tpl/paging/native/demo2', 
		name: 'tpl-paging-native-demo2',
		component: () => import('./modules/tpl-paging-piece.vue') 
	}
];

export const tplOtherConfig = [
	{ 
		path: '/tpl/nolayout', 
		name: 'tpl-nolayout',
		component: () => import('./modules/tpl-nolayout.vue') 
	}
];
