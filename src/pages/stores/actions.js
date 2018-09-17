/**
 * 根级别actions
 */
import net from '../utils/net';

export const actions = {
	ajax(store, opts) {
		store.commit(`API_REQUEST_ON`, { });
		return net.ajax({
			url: `http://localhost:3000/${opts}`
		}).then((res) => {
			store.commit(`API_REQUEST_SUCCESS`, { });
		}).catch((res) => {
			
		});
	}
};



