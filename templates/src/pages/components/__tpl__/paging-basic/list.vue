<template>
	<vc-paging
		:data-source="listInfo.data"
		:count="listInfo.count"
		:total="listInfo.total"
		:reset="listInfo.reset"
		:load-data="loadData"
		class="g-m-t-24"
		history
		show
		@page-size-change="handleResetFirst"
	>
		<tpl-item />
	</vc-paging>
</template>

<script>
import { URL } from '@utils/utils';
import Item from './item';

export default {
	name: 'tpl-table1',
	components: {
		'tpl-item': Item
	},
	data() {
		return {};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplPagingBasic.listInfo;
		}
	},
	mounted() {
		
	},
	methods: {
		loadData(page, pageSize) {
			const { query = {} } = URL.parse();
			return this.request({
				url: 'TPL_PAGING_BASIC_LIST_GET',
				type: 'GET',
				param: {
					...query,
					page: page || 1,
					pageSize: pageSize || 10
				},
			}).then((res) => {
				console.log(res, 'res');
			}).catch((error) => {
				console.log(error, 'error');
			});
		},
		handleChangePageSize() {
			this.$store.commit('TPL_PAGING_BASIC_LIST_INIT');
		},
		handleResetFirst() {
			this.$store.commit('TPL_PAGING_BASIC_LIST_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_PAGING_BASIC_LIST_RESET');
		},
	}
};

</script>

<style lang="scss">

</style>
