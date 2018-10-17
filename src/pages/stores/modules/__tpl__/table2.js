import { initPage } from '@utils/utils';

const initialState = {
	listInfo: {
		'1': {
			...initPage
		},
		'2': {
			...initPage
		},
		'3': {
			...initPage
		},
	}
};

const mutations = {
	TPL_TABLE2_LIST_GET_SUCCESS(state, { data, param: { type, page } }) {
		state.listInfo = {
			...state.listInfo,
			[type]: {
				...state.listInfo[type],
				total: data.totalCount,
				data: {
					...state.listInfo[type].data,
					[page]: data.list
				}
			}
		};
	},
	TPL_TABLE2_LIST_RESET(state, { type }) {
		state.listInfo = {
			...initialState.listInfo,
			[type]: {
				...initPage,
				reset: true
			}
		};
	},
	TPL_TABLE2_SEARCH_INIT(state, payload) {
		state.listInfo = {
			...initialState.listInfo
		};
	},
	TPL_TABLE2_ROUTE_CHANGE(state) {
		state.listInfo = {
			...initialState.listInfo
		};
	}
};

export const tplTable2 = {
	state: { ...initialState },
	mutations,
};