export const settingConfig = [
	{
		path: '/setting',
		redirect: '/setting/main'
	},
	{ 
		path: '/setting/main', 
		name: 'setting-main',
		component: () => import('./modules/setting-main.vue') 
	}
];