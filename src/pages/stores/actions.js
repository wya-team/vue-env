import API_ROOT from './apis/root';
/**
 * 根级别actions
 */
import net from '../utils/net';

export const actions = {
	request(store, opts = {}) {
		const {
			url: mutation,
			redirectMutation, // 重定向Mutation
			param,
			pending,
			fail,
			noLoading,
			...rest
		} = opts;

		let _mutation = redirectMutation || mutation;

		if (!API_ROOT[mutation]) {
			console.error('请求地址不存在');
			return !1;
		}
		
		// pending 为 false，则必须要写_ON的mutation
		pending && store.commit(`${_mutation}_PENDING`, { param });
		return net.ajax({
			url: API_ROOT[mutation],
			param,
			noLoading: param.page === undefined ? noLoading : true,
			...rest
		}).then((res) => {
			const { data } = res;
			store.commit(`${_mutation}_SUCCESS`, {
				data,
				param,
				// ...rest
			});
			return res;
		}).catch((error) => {
			fail && store.commit(`${_mutation}_FAIL`, { param });
			return Promise.reject(error);
		});
	}
};



