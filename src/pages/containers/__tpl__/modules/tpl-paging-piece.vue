<template>
	<set-title title="tpl-paging-piece" style="padding: 16px 24px 24px">
		<tpl-filter />
		<tpl-list />
	</set-title>
</template>

<script>
import List from '@components/__tpl__/paging-piece/list';
import Filter from '@components/__tpl__/paging-piece/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-paging-piece',
	components: {
		"tpl-list": List,
		"tpl-filter": Filter,
	},
	mixins: [navigator('TPL_PAGING_PIECE')],
	data() {
		return {
		};
	},
	created() {
	},
	methods: {
	},
};
</script>

<style lang="scss">
</style>
