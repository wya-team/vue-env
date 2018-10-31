import { getParseUrl, getHashUrl } from '@utils/utils';

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
						}, '/tpl/paging/async');
					}
				}
			],
		};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplPagingTabs.listInfo;
		}
	},
	methods: {
		handleResetFirst() {
			this.$store.commit('TPL_PAGING_TABS_LIST_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_PAGING_TABS_LIST_RESET', { type: this.type });
		},
		handleLinkTo() {
			this.$router.push('/tpl/paging/async');
		},
	}
};