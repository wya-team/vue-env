import Vue from 'vue';
import layout from '@components/layout/layout';
import { PRE_ROUTER_URL } from '../constants/constants';
import { loginConfig } from '../containers/login/app';
import { tplConfig } from '../containers/__tpl__/app';
import { homeConfig } from '../containers/home/app';
import { settingConfig } from '../containers/setting/app';

export default {
	base: PRE_ROUTER_URL,
	mode: 'history',
	routes: [
		...loginConfig,
		{
			path: '/',
			component: layout,
			redirect: '/__tpl__',
			children: [
				...tplConfig,
				...homeConfig,
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
