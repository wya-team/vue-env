/**
 * 支持使用mixin混入和其他服务，比如筛选中的地址数据，xxx 
 * 具体开发模式 ~ 待定
 */
import net from '@utils/net';
import { initTreeData } from '@utils/utils';
import { Store } from '@wya/assist-vc';

const { Service } = Store;

export const services = {
	...Service.createStore({
		key: "xxx", 
		url: 'XXXX'
	}),
	...Service.createStore({
		key: "xxx",
		url: "XXXXX",
	}),
	postSms(param) {
		return net.ajax({
			url: '_COMMON_SMS_POST',
			type: 'POST',
			param,
		}).then(res => {
			return res;
		}).catch(res => {
			return res;
		});
	},
	postImage(param) {
		return net.ajax({
			url: '_COMMON_SMS_POST',
			type: 'POST',
			param,
		}).then(res => {
			return res;
		}).catch(res => {
			return res;
		});
	},
};

export const sockets = {
	...Service.createSocket({
		key: "xxx",
		url: 'xxx',
		onConnect(data, ctx) {
			
		}
	})
};
