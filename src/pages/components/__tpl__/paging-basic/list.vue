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
import { Paging } from 'wya-vc';
import { getParseUrl } from '@utils/utils';
import * as types from '@stores/mutations/__tpl__';
// item
import item from './item';

export default {
	name: 'tpl-table1',
	components: {
		'vc-paging': Paging,
	},
	mixins: [item],
	data() {
		return {};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplPagingBasic.listInfo;
		}
	},
	methods: {
		loadData(page) {
			const { query = {} } = this.$route;
			return this.request({
				url: types.TPL_PAGING_BASIC_LIST_GET,
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

<style lang="scss" scoped>

</style>
