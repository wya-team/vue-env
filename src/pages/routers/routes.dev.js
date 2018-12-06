import Vue from 'vue';
import layout from '@components/layout/layout';
import { PRE_ROUTER_URL } from '../constants/constants';
import { loginConfig } from '../containers/login/app';
import { tplConfig, tplOtherConfig } from '../containers/__tpl__/app';
import { settingConfig, settingOtherConfig } from '../containers/setting/app';

export default {
	base: PRE_ROUTER_URL,
	mode: 'history',
	routes: [
		...loginConfig,
		...(tplOtherConfig || {}),
		...(settingOtherConfig || {}),
		{
			path: '/',
			component: layout,
			redirect: '/__tpl__',
			children: [
				...tplConfig,
				...settingConfig
			]
		},
		{
			path: '*',
			redirect: (to) => {
				return '/login';
			}
		}
	]
};
