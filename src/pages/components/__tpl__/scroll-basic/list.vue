<template>
	<vcm-pull-scroll
		:data-source="listInfo.data"
		:current="listInfo.current"
		:total="listInfo.total"
		:load-data="loadData"
	>
		<template #default="it">
			<tpl-item :it="it" />
		</template>
	</vcm-pull-scroll>
</template>
<script>
import { URL } from '@utils/utils';
import Item from './item';

export default {
	name: "vc-pull-scroll-basic",
	components: {
		'tpl-item': Item
	},
	data() {
		return {
		};
	},
	computed: {
		listInfo() {
			return this.$store.state.tplScrollBasic.listInfo;
		}
	},
	methods: {
		loadData(page, refresh) {
			const { query = {} } = URL.parse();
			return this.request({
				url: 'TPL_SCROLL_BASIC_LIST_GET',
				type: 'GET',
				param: {
					...query,
					page,
					pageSize: 10
				},
				refresh
			}).then((res) => {
				
			}).catch((error) => {
				console.log(error, 'error');
			});
		},
		handleResetFirst() {
			this.$store.commit('TPL_SCROLL_BASIC_LIST_INIT');
		},
	}

};
</script>
