import API_ROOT from './apis/root';
/**
 * 根级别actions
 */
import net from '../utils/net';

export const actions = {
	request(store, opts = {}) {
		const {
			url: mutation,
			param,
			noLoading,
			...rest
		} = opts;
		if (!API_ROOT[mutation]) {
			console.error('请求地址不存在');
			return !1;
		}

		// noLoading 为 false，则必须要写_ON的mutation
		!noLoading && store.commit(`${mutation}_ON`, { param });
		return net.ajax({
			url: API_ROOT[mutation],
			param,
			...rest
		}).then((res) => {
			const { data } = res;
			store.commit(`${mutation}_SUCCESS`, {
				data,
				param,
				// ...rest
			});
			return res;
		}).catch((error) => {
			store.commit(`${mutation}_ERROR`, { param });
			return Promise.reject(error);
		});
	}
};



