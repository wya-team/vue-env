/*
 * @Description: 路由变换触发
 * @Company: WYA
 * @Author: Jiangdong
 * @Date: 2018-10-17 19:40:56
 * @LastEditors: NO Body
 * @LastEditTime: 2018-10-17 19:48:12
 */

export default (page) => {
	return {
		destroyed() {
			if (page) {
				this.$store.commit(`${page}_ROUTE_CHANGE`);
			} else {
				this.$store.commit('ROUTE_CHANGE');
			}
		},
	};
};
  