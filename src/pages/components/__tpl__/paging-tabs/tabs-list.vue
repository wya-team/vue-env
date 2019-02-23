<template>
	<vc-tabs 
		:value="type" 
		:animated="false"
		type="card" 
		style="margin-top: 20px"
		@on-click="handleChange"
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
				:columns="columns" 
				:data-source="listInfo[item.value].data"
				:total="listInfo[item.value].total"
				:reset="listInfo[item.value].reset"
				:current.sync="current[item.value]"
				:history="true"
				:load-data="loadData"
				@page-size-change="handleChangePageSize"
			/>
		</vc-tabs-pane>
	</vc-tabs>
</template>

<script>
import { getParseUrl, getHashUrl } from '@utils/utils';
// item
import item from './item';

export default {
	name: 'tpl-paging-tabs-list',
	components: {
	},
	mixins: [item],
	data() {
		const { query } = this.$route;

		return {
			type: String(query.type || "1"), // 同tabs下的value
			tabs: [
				{ label: '标签一', value: '1' }, 
				{ label: '标签二', value: '2' }, 
				{ label: '标签三', value: '3' }
			],
			current: {}
		};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplPagingTabs.listInfo;
		}
	},
	methods: {
		loadData(page, pageSize) {
			const { query = {} } = getParseUrl();
			return this.request({
				url: 'TPL_PAGING_TABS_LIST_GET',
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
			
			let { query = {} } = getParseUrl();
			query = {
				...query,
				type,
				page: this.current[type]
			};
			this.$router.replace(getHashUrl(`/tpl/paging/tabs`, { ...query }));
		},
		handleChangePageSize() {
			this.$store.commit('TPL_PAGING_TABS_LIST_INIT');
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
