import layout from '@common/layout/layout';
import { PRE_ROUTER_URL } from '../constants/constants';
import { loginConfig } from '../containers/login/app';
import { tplConfig } from '../containers/__tpl__/app';

export const routeConfig = {
	base: PRE_ROUTER_URL,
	mode: 'history',
	routes: [
		...loginConfig,
		{
			path: '/',
			component: layout,
			children: [
				{
					path: '/',
					redirect: { name: 'tpl-main' }
				},
				...tplConfig
				
			]
		},
		{
			path: '*',
			redirect: (to) => {
				return '/tpl/main';
			}
		}
	]
};

