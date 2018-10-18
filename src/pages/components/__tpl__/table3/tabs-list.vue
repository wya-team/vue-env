<template>
	<i-tabs 
		:value="type" 
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
				:ref="item.value"
				:show="item.value == type" 
				:type="item.value"
				:columns="columns" 
				:data-source="listInfo[item.value].data"
				:total="listInfo[item.value].total"
				:reset="listInfo[item.value].reset"
				:history="true"
				:load-data="loadData"
			/>
		</i-tab-pane>
	</i-tabs>
</template>

<script>
import { Tabs, TabPane, Input } from 'iview';
import { Paging } from 'wya-vc';
import { getParseUrl, getHashUrl } from '@utils/utils';
import * as types from '@stores/mutations/__tpl__';
import { setTimeout } from 'timers';

export default {
	name: 'tpl-table2',
	components: {
		'vc-paging': Paging,
		'i-tabs': Tabs,
		'i-tab-pane': TabPane,
		'i-input': Input
	},
	data() {
		const { query } = this.$route;

		return {
			type: String(query.type || "1"), // 同tabs下的value
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
						}, '跳转到table1');
					}
				}
			],
		};
	},
	computed: {
		tabs() {
			return this.$store.state.tplTable3.tabs;
		},
		listInfo() {
			return this.$store.state.tplTable3.listInfo;
		}
	},
	created() {
		console.log(1);
		setTimeout(() => {
			this.request({
				url: types.TPL_TABLE3_TABS_GET,
				type: 'GET',
				localData: {
					data: [],
					status: 1,
					msg: 'success'
				}
			}).then((res) => {
				console.log(res, 'res');
			}).catch((error) => {
				console.log(error, 'error');
			});
		}, 300);
	},
	methods: {
		loadData(page) {
			const { query = {} } = this.$route;
			return this.request({
				url: types.TPL_TABLE3_LIST_GET,
				type: 'GET',
				param: {
					...query,
					page,
					type: this.type
				},
			}).then((res) => {
				console.log(res, 'res');
			}).catch((error) => {
				console.log(error, 'error');
			});
		},
		handleChange(type) {
			this.type = type;

			let query = {
				...this.$route.query,
				type,
				page: this.$refs[type][0].currentPage
			};
			this.$router.replace(getHashUrl(`/tpl/table3`, { ...query }));
		},
		handleResetFirst() {
			this.$store.commit('TPL_TABLE3_SEARCH_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_TABLE3_LIST_RESET', { type: this.type });
		},
		handleLinkTo() {
			this.$router.push('/tpl/table1');
		},
	}
};
</script>

<style lang="scss" scoped>

</style>
