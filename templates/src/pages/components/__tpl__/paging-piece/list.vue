<template>
	<vc-paging
		ref="tableTarget"
		:data-source="listInfo.data"
		:count="listInfo.count" 
		:total="listInfo.total" 
		:reset="listInfo.reset"
		:history="true"
		:load-data="loadData"
		mode="piece"
		class="v-tpl-paging-piece g-m-t-24"
		@page-size-change="handleChangePageSize"
	>
		<template #default="{ it }">
			<tpl-item 
				:it="it"
				class="_item"
			/> 
		</template>
	</vc-paging>
</template>

<script>
import { URL } from '@utils/utils';
// item
import Item from './item';

export default {
	name: 'tpl-table1',
	components: {
		'tpl-item': Item,
	},
	data() {
		return {};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplPagingPiece.listInfo;
		}
	},
	methods: {
		loadData(page, pageSize) {
			const { query = {} } = URL.parse();
			return this.request({
				url: 'TPL_PAGING_PIECE_LIST_GET',
				type: 'GET',
				param: {
					...query,
					page,
					pageSize,
				},
			}).then((res) => {
				console.log(res, 'res');
			}).catch((error) => {
				console.log(error, 'error');
			});
		},
		handleChangePageSize() {
			this.$store.commit('TPL_PAGING_PIECE_LIST_INIT');
		}
	}
};

</script>

<style lang="scss">
.v-tpl-paging-piece {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	._item {
		border: 1px solid $cd9;
		padding: 20px;
		margin-bottom: 20px;
		width: calc(50% - 10px);
	}
}
</style>

