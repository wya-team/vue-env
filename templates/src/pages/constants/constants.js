export const IN_BROWSER = typeof window !== 'undefined';
/**
 * 目前在开发环境可以使用Vue Devtools 和其他
 * true开启，false关闭。
 */
export const DEBUG = __DEV__ || (IN_BROWSER && /github.com$/.test(window.location.origin));
/**
 * 开发模式结合PHP后端
 * true开启，false关闭
 * 即!0后端。!1前端:3000端口
 */
export const DEV_WITH_SERVER = !1;

/**
 * 根路由
 */
export const PRE_ROUTER_URL = process.env.NODE_ENV === 'development'
	? '/'
	: '/';

export const URL_WEBSOCKET = '/wss';

/**
 * 用于判断登录token / user
 */
export const TOKEN_KEY = 'user';
