const initialState = {
	secondStatus: true
};

const mutations = {
	TOGGLE_SECOND_STATUS(state, status) {
		state.secondStatus = status;
	},
};

export const layoutMain = {
	state: { ...initialState },
	mutations,
};