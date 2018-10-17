import { initPage } from '@utils/utils';

const initialState = {
	listInfo: {
		...initPage
	}
};

const mutations = {
	TPL_TABLE1_LIST_GET_SUCCESS(state, { data, param: { page } }) {
		state.listInfo = {
			...state.listInfo,
			total: data.totalCount,
			data: {
				...state.listInfo.data,
				[page]: data.list
			}
		};
	},
	TPL_TABLE1_LIST_RESET(state, payload) {
		state.listInfo = {
			...initPage,
			reset: true
		};
	},
	TPL_TABLE1_SEARCH_INIT(state, payload) {
		state.listInfo = {
			...initPage
		};
	}
};

export const tplTable1 = {
	state: { ...initialState },
	mutations,
};