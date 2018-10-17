import { initPage } from '@utils/utils';

let initialListInfo = {};
const initialState = {
	listInfo: {
	},
	tabs: []
};

const mutations = {
	TPL_TABLE3_TABS_GET_SUCCESS(state, data, param) {
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
	TPL_TABLE3_LIST_GET_SUCCESS(state, { data, param: { type, page } }) {
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
	TPL_TABLE3_LIST_RESET(state, { type }) {
		state.listInfo = {
			...initialListInfo,
			[type]: {
				...initPage,
				reset: true
			}
		};
	},
	TPL_TABLE3_SEARCH_INIT(state, payload) {
		state.listInfo = {
			...initialListInfo
		};
	}
};

export const tplTable3 = {
	state: { ...initialState },
	mutations,
};