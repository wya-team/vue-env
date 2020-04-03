import { initScroll } from '@utils/utils';

const initialState = {
	listInfo: {
		...initScroll
	}
};

const mutations = {
	TPL_SCROLL_BASIC_LIST_GET_SUCCESS(state, { data, param: { page } }) {
		state.listInfo = {
			...state.listInfo,
			...data.page,
			data: [
				...state.listInfo.data,
				...data.list
			]
		};
	},
	TPL_SCROLL_BASIC_LIST_GET_REFRESH(state, { data, param: { page } }) {
		state.listInfo = {
			...state.listInfo,
			...data.page,
			data: [
				...data.list
			]
		};
	},
	TPL_SCROLL_BASIC_LIST_INIT(state, payload) {
		state.listInfo = {
			...initScroll
		};
	},
	TPL_SCROLL_BASIC_ROUTE_CHANGE(state) {
		state.listInfo = {
			...initScroll
		};
	}
};

export const tplScrollBasic = {
	state: { ...initialState },
	mutations,
};