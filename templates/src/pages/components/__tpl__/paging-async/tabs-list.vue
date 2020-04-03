<template>
	<vc-tabs 
		:value="type" 
		:animated="false"
		type="card"
		class="g-m-t-24"
		@click="handleChange"
	>
		<vc-tabs-pane 
			v-for="(item) in tabs"
			:key="item.value"
			:label="item.label" 
			:name="item.value"
		>
			<vc-paging
				:show="item.value == type" 
				:type="item.value"
				:data-source="listInfo[item.value].data"
				:total="listInfo[item.value].total"
				:count="listInfo[item.value].count"
				:reset="listInfo[item.value].reset"
				:current.sync="current[item.value]"
				:history="true"
				:load-data="loadData"
				@page-size-change="handleResetFirst"
			>
				<tpl-item />
			</vc-paging>
		</vc-tabs-pane>
	</vc-tabs>
</template>

<script>
import { URL } from '@utils/utils';
import Item from './item';

export default {
	name: 'tpl-paging-tabs-list',
	components: {
		'tpl-item': Item
	},
	data() {
		const { query } = this.$route;

		return {
			type: String(query.type || "1"), // 同tabs下的value
			current: {}
		};
	},
	computed: {
		tabs() {
			return this.$store.state.tplPagingAsync.tabs;
		},
		listInfo() {
			return this.$store.state.tplPagingAsync.listInfo;
		}
	},
	created() {
		setTimeout(() => {
			this.request({
				url: 'TPL_PAGING_ASYNC_TABS_GET',
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
		loadData(page, pageSize) {
			const { query = {} } = URL.parse();
			return this.request({
				url: 'TPL_PAGING_ASYNC_LIST_GET',
				type: 'GET',
				param: {
					...query,
					page,
					pageSize,
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

			let { query = {} } = URL.parse();
			query = {
				...query,
				type,
				page: this.current[type]
			};
			this.$router.replace(URL.merge({ path: `/tpl/paging/async`, query }));
		},
		handleChangePageSize() {
			this.$store.commit('TPL_PAGING_ASYNC_LIST_INIT');
		},
		handleResetFirst() {
			this.$store.commit('TPL_PAGING_ASYNC_LIST_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_PAGING_ASYNC_LIST_RESET');
		},
	}
};
</script>

<style lang="scss">

</style>
