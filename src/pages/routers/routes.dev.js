import Vue from 'vue';
import { PRE_ROUTER_URL } from '../constants/constants';
import { loginConfig } from '../containers/login/app';
import { tplConfig } from '../containers/__tpl__/app';
import { homeConfig } from '../containers/home/app';
import { settingConfig } from '../containers/setting/app';

export const dynamicRoutes = {
	tpl: tplConfig,
	home: homeConfig,
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
