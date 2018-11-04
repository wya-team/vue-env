<template>
	<vc-paging
		ref="tableTarget"
		:columns="columns"
		:data-source="listInfo.data" 
		:total="listInfo.total"
		:reset="listInfo.reset"
		:history="true"
		:load-data="loadData"
		class="g-m-t-20 v-tpl-paging-native"
		mode="native"
		@page-size-change="handleChangePageSize"
	>
		<tpl-item slot-scope="it" v-bind="it" />
	</vc-paging>
</template>

<script>
import { Paging } from 'wya-vc';
import { getParseUrl } from '@utils/utils';
import Item from './item';

export default {
	name: 'tpl-table1',
	components: {
		'vc-paging': Paging,
		'tpl-item': Item,
	},
	data() {
		return {
			columns: ['Header - 1', 'Header - 2', 'Header - 3', 'Header - 4']
		};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplPagingNative.listInfo;
		}
	},
	methods: {
		loadData(page, pageSize) {
			const { query = {} } = getParseUrl();
			return this.request({
				url: 'TPL_PAGING_NATIVE_LIST_GET',
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
			this.$store.commit('TPL_PAGING_NATIVE_LIST_INIT');
		}
	}
};

</script>

<style lang="scss">
.v-tpl-paging-native table {
	width: 100%;
	thead {
		th {
			text-align: left;
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
			background-color: #f8f8f9;

		}
	}
	tbody {
		background-color: #ffffff;
		td {
			text-align: left;
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
			border: 1px solid #ccc!important
		}
		tr {
			border: 1px solid red!important
		}
	}
}
</style>
