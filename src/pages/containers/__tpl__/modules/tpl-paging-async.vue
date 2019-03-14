<template>
	<set-title title="tpl-paging-async" style="padding: 16px 24px 24px">
		<tpl-filter />
		<tpl-tabs-list />
	</set-title>
</template>

<script>
import TabsList from '@components/__tpl__/paging-async/tabs-list';
import Filter from '@components/__tpl__/paging-async/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-paging-async',
	components: {
		"tpl-tabs-list": TabsList,
		"tpl-filter": Filter,
	},
	mixins: [navigator('TPL_PAGING_ASYNC')],
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