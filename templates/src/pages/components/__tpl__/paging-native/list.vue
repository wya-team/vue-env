<template>
	<vc-paging
		ref="tableTarget"
		:columns="columns"
		:data-source="listInfo.data" 
		:count="listInfo.count"
		:total="listInfo.total"
		:reset="listInfo.reset"
		:history="true"
		:load-data="loadData"
		class="v-tpl-paging-native g-m-t-24"
		mode="native"
		@page-size-change="handleChangePageSize"
	>
		<template #default="{ dataSource }">
			<tpl-item :data-source="dataSource" />
		</template>
	</vc-paging>
</template>

<script>
import { URL } from '@utils/utils';
import Item from './item';

export default {
	name: 'tpl-table1',
	components: {
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
			const { query = {} } = URL.parse();
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
			background-color: $cf8;

		}
	}
	tbody {
		background-color: $white;
		td {
			text-align: left;
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
			border: 1px solid $cd9!important
		}
		tr {
			border: 1px solid red!important
		}
	}
}
</style>
