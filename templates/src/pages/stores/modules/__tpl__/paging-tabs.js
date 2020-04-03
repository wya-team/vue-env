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
	TPL_PAGING_TABS_LIST_GET_SUCCESS(state, { data, param: { type, page } }) {
		state.listInfo = {
			...state.listInfo,
			[type]: {
				...state.listInfo[type],
				...data.page,
				data: {
					...state.listInfo[type].data,
					[page]: data.list
				}
			}
		};
	},
	TPL_PAGING_TABS_LIST_RESET(state, { type }) {
		state.listInfo = {
			...initialState.listInfo,
			[type]: {
				...initPage,
				reset: true
			}
		};
	},
	TPL_PAGING_TABS_LIST_INIT(state, payload) {
		state.listInfo = {
			...initialState.listInfo
		};
	},
	TPL_PAGING_TABS_ROUTE_CHANGE(state) {
		state.listInfo = {
			...initialState.listInfo
		};
	}
};

export const tplPagingTabs = {
	state: { ...initialState },
	mutations,
};