import { initPage } from '@utils/utils';

const initialState = {
	listInfo: {
		...initPage
	}
};

const mutations = {
	TPL_PAGING_BASIC_LIST_GET_SUCCESS(state, { data, param: { page } }) {
		state.listInfo = {
			...state.listInfo,
			...data.page,
			data: {
				...state.listInfo.data,
				[page]: data.list
			}
		};
	},
	TPL_PAGING_BASIC_LIST_RESET(state, payload) {
		state.listInfo = {
			...initPage,
			reset: true
		};
	},
	TPL_PAGING_BASIC_LIST_INIT(state, payload) {
		state.listInfo = {
			...initPage
		};
	},
	TPL_PAGING_BASIC_ROUTE_CHANGE(state) {
		state.listInfo = {
			...initPage
		};
	}
};

export const tplPagingBasic = {
	state: { ...initialState },
	mutations,
};