/**
 * 全部变量初始化及使用
 */

typeof window === "object" ? window._global = {} : this._global = {};

_global.version = '1.0';

window.addEventListener('keypress', (e) => {
	if (e.keyCode == 114) {
		location.reload();
	}
});
