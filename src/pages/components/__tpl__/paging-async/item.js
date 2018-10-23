import { getParseUrl, getHashUrl } from '@utils/utils';
import * as types from '@stores/mutations/__tpl__';

export default {
	data() {
		const { query } = this.$route;

		return {
			columns: [
				{
					title: 'Title',
					key: 'title'
				},
				{
					title: 'Status',
					key: 'status',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: this.handleResetFirst
							}
						}, '回到首页刷新');
					}
				},
				{
					title: 'Opt',
					key: 'opt',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: this.handleResetCur
							}
						}, '当前页刷新');
					}
				},
				{
					title: 'Link',
					key: 'link',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: this.handleLinkTo
							}
						}, '跳转到paging-piece');
					}
				}
			],
		};
	},
	methods: {
		handleResetFirst() {
			this.$store.commit('TPL_PAGING_ASYNC_SEARCH_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_PAGING_ASYNC_LIST_RESET', { type: this.type });
		},
		handleLinkTo() {
			this.$router.push('/tpl/paging/piece');
		},
	}
};