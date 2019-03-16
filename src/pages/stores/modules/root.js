import __tpl__ from './__tpl__/root';
import login from './login/root';
import setting from './setting/root';
import layout from './layout/root';

export default {
	...__tpl__,
	...layout,
	...login,
	...setting
};
