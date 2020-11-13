import { Store } from '@wya/assist-vc';
import API_ROOT from './apis/root';
/**
 * 根级别actions
 */
import net from '../utils/net';

export const actions = {
	request: Store.actions.request({
		apis: API_ROOT,
		request: net.ajax
	})
};




