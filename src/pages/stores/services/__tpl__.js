/**
 * 使用mixin混入，比如筛选中的地址数据，xxx 
 * 具体开发模式 ~ 待定
 */
import { initTreeData } from '@utils/utils';
import { createService, serviceObj, serviceCompare } from './utils';

export const services = {
	...createService({
		key: "xxx", 
		url: 'XXXX'
	}),
	...createService({
		key: "xxx",
		url: "XXXXX",
	})
};
