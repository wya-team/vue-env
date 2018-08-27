import tpl from './modules/login.vue';

export const loginConfig = [
	{ 
		path: '/login',
		name: 'login',
		component: () => import('./modules/login.vue') 
	}
];
