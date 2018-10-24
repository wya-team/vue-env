<template>
	<vc-paging
		ref="tableTarget"
		:data-source="listInfo.data"
		:total="listInfo.total" 
		:reset="listInfo.reset"
		:history="true"
		:load-data="loadData"
		mode="piece"
		class="g-m-t-20 v-tpl-paging-piece"
	>
		<tpl-item 
			slot-scope="it"
			v-bind="it"
			class="_item"
		/> 
	</vc-paging>
</template>

<script>
import { Paging } from 'wya-vc';
import { getParseUrl } from '@utils/utils';
import * as types from '@stores/mutations/__tpl__';
// item
import Item from './item';

export default {
	name: 'tpl-table1',
	components: {
		'vc-paging': Paging,
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
		loadData(page) {
			const { query = {} } = this.$route;
			return this.request({
				url: types.TPL_PAGING_PIECE_LIST_GET,
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
		}
	}
};

</script>

<style lang="scss">
.v-tpl-paging-piece {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 20px 0;
	._item {
		border: 1px solid #d4d4d4;
		padding: 20px;
		margin-bottom: 20px;
		width: calc(50% - 10px);
	}
}
</style>

