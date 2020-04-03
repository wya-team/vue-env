import { getTplRoutes } from "./tpl";
import { getSettingRoutes } from "./setting";

export const getChildMenus = (auth) => ({
	tpl: getTplRoutes(auth),
	setting: getSettingRoutes(auth)
});