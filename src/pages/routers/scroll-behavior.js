/**
 * TODO: 容器场景
 */
export default (to, from, pos) => {
	window.app && window.app.$vc.off('trigger-scroll');
	/**
	 * back，go时候触发
	 */
	if (pos) return pos;

	return new Promise((resolve) => {
		/**
		 * push/replace触发
		 */
		if (!pos || pos.y) {
			setTimeout(() => {
				resolve({ x: 0, y: 0 });
			}, 0);
		}

		/**
		 * tabs在容器内切换时会被保留
		 * 异步场景
		 */
		window.app && window.app.$vc.once('trigger-scroll', (v) => {
			resolve(v);
		});
	});
};