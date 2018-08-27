import { tplConfig } from '../containers/__tpl__/app';
import { loginConfig } from '../containers/login/app';
import layout from '../components/layout/layout.vue';

export const routeConfig = {
	mode: 'history',
	routes: [
		...loginConfig,
		{
			path: '/',
			component: layout,
			children: [
				{
					path: '/',
					redirect: '/tpl'
				},
				...tplConfig
			]
		},
		{
			path: '*',
			redirect: '/login'
		}
	]
};
