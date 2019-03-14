<template>
	<set-title title="tpl-paging-native" style="padding: 16px 24px 24px">
		<tpl-filter />
		<tpl-list />
	</set-title>
</template>

<script>
import List from '@components/__tpl__/paging-native/list';
import Filter from '@components/__tpl__/paging-native/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-paging-native',
	components: {
		"tpl-list": List,
		"tpl-filter": Filter,
	},
	mixins: [navigator('TPL_PAGING_NATIVE')],
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
