<template>
	<set-title title="tpl-paging-basic" style="padding: 16px 24px 24px">
		<tpl-filter />
		<tpl-list />
	</set-title>
</template>

<script>
import List from '@components/__tpl__/paging-basic/list';
import Filter from '@components/__tpl__/paging-basic/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-paging-basic',
	components: {
		"tpl-list": List,
		"tpl-filter": Filter,
	},
	mixins: [navigator('TPL_PAGING_BASIC')],
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
