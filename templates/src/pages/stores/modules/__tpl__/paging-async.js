import { initPage } from '@utils/utils';

let initialListInfo = {};
const initialState = {
	listInfo: {
	},
	tabs: []
};

const mutations = {
	TPL_PAGING_ASYNC_TABS_GET_SUCCESS(state, data, param) {
		state.tabs = [
			{ label: '标签一', value: '1' }, 
			{ label: '标签二', value: '2' }, 
			{ label: '标签三', value: '3' }
		];
		for (let i = 0; i < state.tabs.length; i++) {
			initialListInfo = {
				...initialListInfo,
				[state.tabs[i].value]: {
					...initPage
				}
			};
		}
		state.listInfo = {
			...initialListInfo
		};
	},
	TPL_PAGING_ASYNC_LIST_GET_SUCCESS(state, { data, param: { type, page } }) {
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
	TPL_PAGING_ASYNC_LIST_RESET(state, { type }) {
		state.listInfo = {
			...initialListInfo,
			[type]: {
				...initPage,
				reset: true
			}
		};
	},
	TPL_PAGING_ASYNC_LIST_INIT(state, payload) {
		state.listInfo = {
			...initialListInfo
		};
	},
	TPL_PAGING_ASYNC_ROUTE_CHANGE(state) {
		state.listInfo = {};
		state.tabs = [];
	}
};

export const tplPagingAsync = {
	state: { ...initialState },
	mutations,
};