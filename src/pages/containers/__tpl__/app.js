export const tplConfig = [
	{ 
		path: '/tpl', 
		name: 'tpl',
		component: () => import('./modules/tpl.vue') 
	},
	{ 
		path: '/tpl/one', 
		name: 'tpl-one',
		component: () => import('./modules/tpl-one.vue') 
	}

];

export const tplOtherConfig = [
	{ 
		path: '/tpl/nolayout', 
		name: 'tpl-nolayout',
		component: () => import('./modules/tpl-nolayout.vue') 
	}
];
