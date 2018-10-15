// import * as types from '@mutations/__tpl__';

const initialState = {
	user: '',
	listInfo: {
		'1': {
			loading: false,
			curPage: 1,
			resetPage: 1,
			totalCount: 0,
			list: {}
		},
		'2': {
			loading: false,
			curPage: 1,
			resetPage: 1,
			totalCount: 0,
			list: {}
		},
		'3': {
			loading: false,
			curPage: 1,
			resetPage: 1,
			totalCount: 0,
			list: {}
		},
	}
};

const mutations = {
	TPL_REQUEST_POST_SUCCESS(state, { data = {}, param }) {
		state.user = data.user;
	},
	TPL_LIST_GET_ON(state, { data, param: { status, page } }) {
		state.listInfo = {
			...state.listInfo,
			[status]: {
				...state.listInfo[status],
				loading: true
			}
		};
	},
	TPL_LIST_GET_SUCCESS(state, { data, param: { status, page } }) {
		state.listInfo = {
			...state.listInfo,
			[status]: {
				...state.listInfo[status],
				loading: false,
				curPage: parseInt(page, 10) || 1,
				resetPage: parseInt(page, 10) || 1,
				totalCount: data.totalCount,
				list: {
					...state.listInfo[status].list,
					[page]: data.list
				}
			}
		};
	},
	TPL_LIST_GET_ERROR(state, { data, param: { status, page } }) {
		state.listInfo = {
			...state.listInfo,
			[status]: {
				...state.listInfo[status],
				loading: false
			}
		};
	},
	TPL_CURRENT_PAGE_REFRESH(state, { status }) {
		state.listInfo = {
			...state.listInfo,
			[status]: {
				...state.listInfo[status],
				loading: false,
				curPage: 1, 
				resetPage: state.listInfo[status].curPage,
				totalCount: 0,
				list: {}
			}
		};
	},
	TPL_SEARCH_INIT(state, payload) {
		state.listInfo = {
			'1': {
				loading: false,
				curPage: 1,
				resetPage: 1,
				totalCount: 0,
				list: {}
			},
			'2': {
				loading: false,
				curPage: 1,
				resetPage: 1,
				totalCount: 0,
				list: {}
			},
			'3': {
				loading: false,
				curPage: 1,
				resetPage: 1,
				totalCount: 0,
				list: {}
			},
		};
	}
};

const getters = {
	listInfo(state) {
	  return state.listInfo;
	},
};

export const tplRequest = {
	state: initialState,
	mutations,
	getters
};