<template>
	<vc-paging
		ref="tableTarget"
		:columns="columns"
		:data-source="listInfo.data" 
		:total="listInfo.total"
		:reset="listInfo.reset"
		:history="true"
		:load-data="loadData"
		class="g-m-t-20"
	/>
</template>

<script>
import { Paging } from 'wya-vc';
import { getParseUrl } from '@utils/utils';
import * as types from '@stores/mutations/__tpl__';

export default {
	name: 'tpl-table1',
	components: {
		'vc-paging': Paging,
	},
	data() {
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
						}, '跳转到table2');
					}
				}
			],
		};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplTable1.listInfo;
		}
	},
	methods: {
		loadData(page) {
			const { query = {} } = this.$route;
			return this.request({
				url: types.TPL_TABLE1_LIST_GET,
				type: 'GET',
				param: {
					...query,
					page,
				},
			}).then((res) => {
				console.log(res, 'res');
			}).catch((error) => {
				console.log(error, 'error');
			});
		},
		handleResetFirst() {
			this.$store.commit('TPL_TABLE1_SEARCH_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_TABLE1_LIST_RESET');
		},
		handleLinkTo() {
			this.$router.push('/tpl/table2');
		},
	}
};

</script>

<style lang="scss" scoped>

</style>
