const LayoutStore = function (initialState = {}) {
	this.states = {
		secondStatus: true
	};
	/* eslint-disable */
	for (let prop in initialState) {
		if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
			this.states[prop] = initialState[prop];
		}
	}
	/* eslint-enable */
};
LayoutStore.prototype.mutations = {
	toggleSecond(states, data) {
		states.secondStatus = data;
	}
};
LayoutStore.prototype.commit = function (name, ...args) {
	const mutations = this.mutations;
	if (mutations[name]) {
		mutations[name].apply(this, [this.states].concat(args));
	} else {
		throw new Error(`Action not found: ${name}`);
	}
};

export default new LayoutStore();