export const tplConfig = [
	{ 
		path: '/tpl', 
		name: 'tpl',
		component: () => import('./modules/tpl.vue') 
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
	}
];

export const tplOtherConfig = [
	{ 
		path: '/tpl/nolayout', 
		name: 'tpl-nolayout',
		component: () => import('./modules/tpl-nolayout.vue') 
	}
];
