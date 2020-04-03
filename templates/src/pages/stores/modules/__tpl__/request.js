const initialState = {
	user: '',
};

const mutations = {
	TPL_REQUEST_POST_SUCCESS(state, { data = {}, param }) {
		state.user = data.user;
	},
	
};

export const tplRequest = {
	state: initialState,
	mutations,
};