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
/*
 * @Description: 常规Table TPL
 * @Company: WYA
 * @Author: Jiangdong
 * @Date: 2018-10-17 14:22:34
 * @LastEditors: NO Body
 * @LastEditTime: 2018-10-17 16:40:47
 */
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
		}
	}
};

</script>

<style lang="scss" scoped>

</style>
