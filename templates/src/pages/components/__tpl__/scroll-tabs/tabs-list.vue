<template>
	<vcm-tabs 
		:value="type" 
		:animated="false"
		@click="handleChange"
	>
		<vcm-tabs-pane 
			v-for="(item) in tabs"
			:key="item.value"
			:label="item.label" 
			:name="item.value"
		>
			<vcm-pull-scroll
				:show="item.value == type" 
				:type="item.value"
				:data-source="listInfo[item.value].data"
				:total="listInfo[item.value].total"
				:count="listInfo[item.value].count"
				:load-data="loadData"
				:height="$global.height - 53"
				wrapper
			>
				<template #default="it">
					<tpl-item :it="it" />
				</template>
			</vcm-pull-scroll>
		</vcm-tabs-pane>
	</vcm-tabs>
</template>

<script>
import { URL } from '@utils/utils';
import Item from './item';

export default {
	name: 'tpl-scroll-tabs-list',
	components: {
		'tpl-item': Item
	},
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
			return this.$store.state.tplScrollTabs.listInfo;
		}
	},
	methods: {
		loadData(page, refresh) {
			const { query = {} } = URL.parse();
			return this.request({
				url: 'TPL_SCROLL_TABS_LIST_GET',
				type: 'GET',
				param: {
					...query,
					page,
					type: this.type
				},
				refresh
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
				type
			};
			this.$router.replace(URL.merge({ path: `/tpl/scroll/tabs`, query }));
		}
	}
};
</script>

<style lang="scss">

</style>
