const IN_BROWSER = typeof window !== 'undefined';

class ScrollManager {
	constructor() {
		/**
		 * 历史
		 * @type [key]: [Object]
		 * {
		 * 	x,
		 * 	y,
		 * 	snapshot,
		 * 	wrapper
		 * }
		 */
		this.history = {};

		if (!IN_BROWSER) return;
		this._init();

		__DEV__ && (window.HISTORY = this.history);
	}

	_init() {
		if (!IN_BROWSER) return;
		/**
		 * 事件委托代理，目前仅涉及考虑移动端
		 */
		window.addEventListener('touchmove', (e) => {
			let path = e.path || (e.composedPath && e.composedPath()) || [];
			// TODO: 可能存在多个，如嵌套关系
			let $this = path.filter((ele) => /scroll-container/.test(ele.className));
			// 横向滚动则跳过
			if ($this[0] && $this[0].scrollWidth > $this[0].offsetWidth) {
				return;
			}
			const {
				scrollLeft: x,
				scrollTop: y
			} = $this[0] || document.scrollingElement;

			let key = window.location.pathname;
			let current = this.history[key];

			this.history[key] = {
				...current,
				x,
				y,
				wrapper: $this.length > 0
			};
		}, true);

		/**
		 * go or back
		 */
		window.addEventListener('popstate', e => {
			let key = window.location.pathname;
			let current = this.history[key];
			if (!current) return;
			this.history[key].snapshot = {
				x: current.x || 0,
				y: current.y || 0
			};
		});
	}

	/**
	 * 触发滚动
	 * 同步：已经渲染标记：g-scroll-container
	 * 异步：未渲染标记：g-scroll-container
	 */
	refresh() {
		if (!IN_BROWSER) return;
		// TODO: 精确匹配
		let state = false;

		let key = window.location.pathname;

		let current = this.history[key];
		if (!current) return state;

		let el = current.wrapper
			? document.querySelector('.g-scroll-container')
			: document.scrollingElement;
		let { x, y } = (current.snapshot || {});

		if (el && (x || y)) {
			state = true;
			el.scrollLeft = x;
			el.scrollTop = y;
			/**
			 * 1. 删除快照
			 * 2. 重置为当前位置，用于异步
			 */
			this.history[key] = {
				...this.history[key],
				x,
				y,
				snapshot: null
			};

		} else {
			/**
			 * 1. 点击跳转, 清楚历史
			 * 2. 异步条件时, 删除记录的x, y, 完成时使用 snapshot 滚动
			 */
			this.history[key].x = 0;
			this.history[key].y = 0;
		}
		return state;
	}
}

const scrollManager = new ScrollManager();

export default (to, from, pos) => {
	if (!IN_BROWSER) return;
	// - start 容器下滚动
	window.app && window.app.$vc.off('trigger-scroll');

	/**
	 * 容器下同步滚动过
	 */
	if (scrollManager.refresh()) return;
	/**
	 * 异步滚动
	 */
	window.app && window.app.$vc.once('trigger-scroll', (v) => {
		scrollManager.refresh();
	});

	/**
	 * window页面滚动之后跳转到window页面下 滚动条会保留
	 */
	return {
		x: 0,
		y: 0
	};
};
