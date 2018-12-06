import { isEqualWith } from 'lodash';
import API_ROOT from '@stores/apis/root';

export const serviceObj = {
	param: {},
	res: undefined
};
export const serviceCompare = (newParam, localObj) => {
	return isEqualWith(newParam, localObj.param)
		? localObj.res
		: undefined;
};
export const createService = (defaultOptions = {}) => {
	const {
		key, 
		url, 
		parser = null, 
		cache = false, 
		param: defaultParam = {}
	} = defaultOptions;
	let store = { ...serviceObj };
	return { 
		[key]: (userOptions = {}) => {
			const { autoLoad = true } = userOptions;
			// 方法首字母大写
			const Capitalize = key.charAt(0).toUpperCase() + key.slice(1);

			const loadKey = `load${Capitalize}`;
			const clearKey = `clear${Capitalize}`;

			return {
				data() {
					return {
						[key]: (store.res || {}).data
					};
				},
				created() {
					autoLoad && (this[loadKey])(defaultParam);
				},
				methods: {
					[loadKey](param, opts = {}) { // eslint-disable-line
						this.loading = false;
						return this.$request({
							url: API_ROOT[url],
							type: 'GET',
							localData: serviceCompare(param, store),
							loading: false,
							param,
							...opts
						}).then((res) => {
							res = {
								...res,
								data: parser ? parser(res.data) : res.data
							};
							store = {
								param,
								res
							};
							this[key] = store.res.data;
							return res;
						}).catch((res) => {
							this.$Message.error(res.msg);
							return Promise.reject(res);
						}).finally(() => {
							this.loading = true;
						});
					},
					[clearKey]() {
						store = { ...serviceObj };
					}
				}
			};
		}
	};
};