<template>
	<set-title title="tpl-paging-tabs" style="padding: 16px 24px 24px">
		<tpl-filter />
		<tpl-tabs-list />
	</set-title>
</template>

<script>
import TabsList from '@components/__tpl__/paging-tabs/tabs-list';
import Filter from '@components/__tpl__/paging-tabs/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-paging-tabs',
	components: {
		"tpl-filter": Filter,
		"tpl-tabs-list": TabsList,
	},
	mixins: [navigator('TPL_PAGING_TABS')],
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
