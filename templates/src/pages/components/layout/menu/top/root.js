import { getTplTopRoutes } from './tpl';
import { getSettingTopRoutes } from './setting';

export const getTopMenus = (auth) => ({
	...getTplTopRoutes(auth),
	...getSettingTopRoutes(auth)
});