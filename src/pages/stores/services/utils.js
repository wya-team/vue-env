import { isEqualWith } from 'lodash';
import { getItem, setItem } from '@utils/utils';
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
	let store;
	cache && (store = getItem(`${key}_${_global.version}`));
	store = store || { ...serviceObj };
	return { 
		[key]: (userOptions = {}) => {
			const { autoLoad = true } = userOptions;
			// 方法首字母大写
			const strFn = key.charAt(0).toUpperCase() + key.slice(1);

			const loadKey = `load${strFn}`;
			const clearKey = `clear${strFn}`;

			return {
				data() {
					return {
						[key]: (store.res || {}).data || []
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
							cache && setItem(`${key}_${_global.version}`, store);
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