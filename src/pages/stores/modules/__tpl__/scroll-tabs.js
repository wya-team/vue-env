import { initScroll } from '@utils/utils';

const initialState = {
	listInfo: {
		'1': {
			...initScroll
		},
		'2': {
			...initScroll
		},
		'3': {
			...initScroll
		},
	}
};

const mutations = {
	TPL_SCROLL_TABS_LIST_GET_SUCCESS(state, { data, param: { type, page } }) {
		state.listInfo = {
			...state.listInfo,
			[type]: {
				...state.listInfo[type],
				...data.page,
				data: [
					...state.listInfo[type].data,
					...data.list
				]
			}
		};
	},
	TPL_SCROLL_TABS_LIST_GET_REFRESH(state, { data, param: { type, page } }) {
		state.listInfo = {
			...initialState.listInfo,
			[type]: {
				...state.listInfo[type],
				...data.page,
				data: [
					...data.list
				]
			}
		};
	},
	TPL_SCROLL_TABS_LIST_INIT(state, payload) {
		state.listInfo = {
			...initialState.listInfo
		};
	},
	TPL_SCROLL_TABS_ROUTE_CHANGE(state) {
		state.listInfo = {
			...initialState.listInfo
		};
	}
};

export const tplScrollTabs = {
	state: { ...initialState },
	mutations,
};