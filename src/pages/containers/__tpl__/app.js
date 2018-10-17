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
	},
	{ 
		path: '/tpl/table1', 
		name: 'tpl-table1',
		component: () => import('./modules/tpl-table1.vue') 
	},
	{ 
		path: '/tpl/table2', 
		name: 'tpl-table2',
		component: () => import('./modules/tpl-table2.vue') 
	},
	{ 
		path: '/tpl/table3', 
		name: 'tpl-table3',
		component: () => import('./modules/tpl-table3.vue') 
	}
];

export const tplOtherConfig = [
	{ 
		path: '/tpl/nolayout', 
		name: 'tpl-nolayout',
		component: () => import('./modules/tpl-nolayout.vue') 
	}
];
