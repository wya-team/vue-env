export const settingConfig = [
	{ 
		path: '/setting/main', 
		name: 'setting-main',
		components: [
			() => import('./modules/setting-main.vue'),
			'left',
			'top'
		]
	}
];