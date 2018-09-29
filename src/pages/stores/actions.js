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
			...rest
		} = opts;

		// store.commit(`${mutation}_ON`, { });
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
		}).catch((res) => {
			// store.commit(`${mutation}_ERROR`, { });
			return res;
		});
	}
};



