/**
 * socket管理
 */
import { Socket } from 'wya-socket';
import net from '@utils/net';
import { URL_WEBSOCKET } from '@constants/constants';

const sockets = {};

/**
 * 创建socket
 * @param {*} opts 
 */
export const service = (opts = {}) => {
	const { 
		sName,
		url = URL_WEBSOCKET,
		bindUrl,
		param = {},
		getParam = (props) => ({}),
		isNeedDestroy = true,
		parser
	} = opts;

	if (!sName) {
		console.log('sName 必传');
		return;
	}
	return {
		data() {
			return {
				socket: sockets[sName] 
			};
		},
		created() {
			this.createWebSocket();
		},
		methods: {
			createWebSocket() {
				if (!sockets[sName]) {
					sockets[sName] = new Socket({ parser });
					this.socket = sockets[sName];
					sockets[sName].connect(url);
					// 链接成功后获取client_id
					bindUrl && sockets[sName].on('connect', (res) => {
						const { data = {} } = res.data || {};
						net.ajax({
							url: bindUrl,
							type: 'GET',
							param: {
								...data,
								...param,
								...getParam()
							},
						}).then((res) => { // eslint-disable-line
							console.log('socket-socket', res);
						}).catch((error) => {
							this.$Message.error(error.msg);
						});
						// 绑定id，后端要求
					});
					sockets[sName].on('error', (res) => {
						this.$Message.error('服务器连接失败,请刷新页面');
					});
				}
			}
		},
		beforeDestroy() {
			isNeedDestroy && sockets[sName] && sockets[sName].close();
			isNeedDestroy && (sockets[sName] = undefined);
		}
	};
};


export const injectSocket = (opts = {}) => {
	const { sName } = opts;
	if (!sName) {
		console.log('sName 必传');
		return;
	}
	if (!sockets[sName]) {
		console.error(`Socket: ${sName} error, 未找到实例`);
		return {};
	}
	return {
		data() {
			return {
				socket: sockets[sName]
			};
		}
	};
};