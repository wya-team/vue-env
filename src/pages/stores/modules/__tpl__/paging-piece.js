import { initPage } from '@utils/utils';

const initialState = {
	listInfo: {
		...initPage
	}
};

const mutations = {
	TPL_PAGING_PIECE_LIST_GET_SUCCESS(state, { data, param: { page } }) {
		state.listInfo = {
			...state.listInfo,
			total: data.totalCount,
			data: {
				...state.listInfo.data,
				[page]: data.list
			}
		};
	},
	TPL_PAGING_PIECE_LIST_RESET(state, payload) {
		state.listInfo = {
			...initPage,
			reset: true
		};
	},
	TPL_PAGING_PIECE_SEARCH_INIT(state, payload) {
		state.listInfo = {
			...initPage
		};
	},
	TPL_PAGING_PIECE_ROUTE_CHANGE(state) {
		state.listInfo = {
			...initPage
		};
	}
};

export const tplPagingPiece = {
	state: { ...initialState },
	mutations,
};