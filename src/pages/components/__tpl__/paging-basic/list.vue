<template>
	
	<vc-table 
		:data="listInfo.data[1]"
	>
		<vc-table-column
			prop="id"
			label="ID"
			width="180"
		/>
		<vc-table-column
			prop="msg"
			label="信息"
			width="180"
		/>
		<vc-table-column
			prop="address"
			label="地址"
		>
			<div @click="handleResetFirst">回到首页刷新</div>
			<div @click="handleResetCur">当前页刷新</div>
		</vc-table-column>
	</vc-table>
</template>

<script>
import { URL } from '@utils/utils';

export default {
	name: 'tpl-table1',
	components: {
	},
	data() {
		return {};
	},
	computed: {
		listInfo() {
			console.log(this.$store.state.tplPagingBasic.listInfo);
			return this.$store.state.tplPagingBasic.listInfo;
		}
	},
	mounted() {
		this.loadData(1, 10);
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

<style lang="scss" scoped>

</style>
