import Vue from 'vue';
import { PRE_ROUTER_URL } from '../constants/constants';
import { tplConfig } from '../containers/__tpl__/app';
import { loginConfig } from '../containers/login/app';
import { settingConfig } from '../containers/setting/app';

export const dynamicRoutes = {
	tpl: tplConfig,
	setting: settingConfig,
};
export const basicRoutes = {
	base: PRE_ROUTER_URL,
	mode: 'history',
	routes: [
		...loginConfig,
		{
			path: '*',
			redirect: (to) => {
				return '/login';
			}
		}
	]
};
