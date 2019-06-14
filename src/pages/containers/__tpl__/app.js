export const tplConfig = [
	{ 
		path: '/tpl/main', 
		name: 'tpl-main',
		components: [
			() => import('./modules/tpl-main.vue')
		]
	},
	{ 
		path: '/tpl/basic', 
		name: 'tpl-basic',
		components: [
			() => import('./modules/tpl-basic.vue'),
			'left',
			'top'
		]
	},

	{ 
		path: '/tpl/request', 
		name: 'tpl-request',
		components: [
			() => import('./modules/tpl-request.vue'),
			'left',
			'top'
		]
	},
	// 表单
	{ 
		path: '/tpl/form', 
		name: 'tpl-form',
		components: [
			() => import('./modules/tpl-form.vue'),
			'left',
			'top'
		]
	},
	{ 
		path: '/tpl/paging/basic', 
		name: 'tpl-paging-basic',
		components: [
			() => import('./modules/tpl-paging-basic.vue'),
			'left',
			'top'
		]
	},
	{ 
		path: '/tpl/paging/tabs', 
		name: 'tpl-paging-tabs',
		components: [
			() => import('./modules/tpl-paging-tabs.vue'),
			'left',
			'top'
		]
	},
	{ 
		path: '/tpl/paging/async', 
		name: 'tpl-paging-async',
		components: [
			() => import('./modules/tpl-paging-async.vue'),
			'left',
			'top'
		]
	},
	{ 
		path: '/tpl/paging/piece', 
		name: 'tpl-paging-piece',
		components: [
			() => import('./modules/tpl-paging-piece.vue'),
			'left',
			'top'
		]
	},
	{ 
		path: '/tpl/paging/native/demo1', 
		name: 'tpl-paging-native-demo1',
		components: [
			() => import('./modules/tpl-paging-native.vue'),
			'left'
		]
	},
	{ 
		path: '/tpl/paging/native/demo2', 
		name: 'tpl-paging-native-demo2',
		components: [
			() => import('./modules/tpl-paging-native.vue'),
			'left'
		]
	},
	{ 
		path: '/tpl/scroll/basic', 
		name: 'tpl-scroll-basic',
		components: [
			() => import('./modules/tpl-scroll-basic.vue')
		]
	},
	{ 
		path: '/tpl/scroll/tabs', 
		name: 'tpl-scroll-tabs',
		components: [
			() => import('./modules/tpl-scroll-tabs.vue')
		]
	}
];

export const tplOtherConfig = [
	{ 
		path: '/tpl/nolayout', 
		name: 'tpl-nolayout',
		components: [
			import('./modules/tpl-nolayout.vue')
		]
	}
];
