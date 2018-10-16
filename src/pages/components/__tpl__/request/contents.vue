<template>
	<!-- <div @click="$router.push('/tpl')"> -->
	<div>
		<div @click="handleSearch">搜索</div>
		<i-tabs 
			:value="status" 
			:animated="false" 
			@on-click="handleChange"
		>
			<i-tab-pane 
				v-for="(item) in tabs"
				:key="item.value"
				:label="item.label" 
				:name="item.value"
			>
				<vc-paging
					v-if="item.value === status" 
					:data-source="listInfo[status].list"
					:columns="columns" 
					:loading="listInfo[status].loading"
					:total="listInfo[status].totalCount"
					:cur-page="listInfo[status].curPage"
					:reset-page="listInfo[status].resetPage"
					:history="true"
					@page-change="loadData" 
				/>
			</i-tab-pane>
		</i-tabs>
	</div>
</template>

<script>
import * as types from '@mutations/__tpl__';
import { Paging } from 'wya-vc';
import { Tabs, TabPane } from 'iview';
import { getHashUrl } from '@utils/utils';

export default {
	name: 'one',
	components: {
		'vc-paging': Paging,
		'i-tabs': Tabs,
		'i-tab-pane': TabPane
	},
	data() {
		return {
			tabs: [
				{ label: '标签一', value: '1' }, 
				{ label: '标签二', value: '2' }, 
				{ label: '标签三', value: '3' }
			],
			columns: [
				{
					title: '标题',
					key: 'title'
				},
				{
					title: '图片',
					key: 'img',
					render: (h, params) => {
						return h('img', {
							src: params.row.img
						}, '111');
					}
				},
				{
					title: 'Opt',
					key: 'time',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									this.$store.commit('TPL_CURRENT_PAGE_REFRESH', { status: this.status });
								}
							}
						}, '当前页刷新');
					}
				}
			]
		};
	},
	computed: {
		listInfo() {
			return this.$store.getters.listInfo;
		},
		status() {
			return this.$route.query.status || '1';
		},
	},
	methods: {
		loadData(page) {
			const { status, listInfo } = this;
			const { list } = listInfo[status] || {};
			let pageData = list[page] || [];

			if (pageData.length > 0) {
				this.$store.commit('TPL_CHANGE_PAGE', { page, status });
				return false;
			}
			this.request({
				url: types.TPL_LIST_GET,
				type: 'GET',
				param: {
					status,
					page,
				},
				noLoading: false
			}).then((res) => {
				console.log(res, 'res');
			}).catch((error) => {
				console.log(error, 'error');
			});
		},
		handleChange(name) {
			let { query } = this.$route;
			query = {
				...query,
				status: name,
				page: this.listInfo[name].curPage || 1
			};
			this.$router.replace(getHashUrl('/tpl/request', { ...query }));
		},
		handleSearch() {
			this.$store.commit('TPL_SEARCH_INIT');
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
