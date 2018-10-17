<template>
	<set-title title="tpl-request" style="padding: 20px">
		<tpl-filter />
		<tpl-list-tabs />
	</set-title>
</template>

<script>
import ListTabs from '@components/__tpl__/table2/list-tabs';
import Filter from '@components/__tpl__/table2/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-request',
	components: {
		"tpl-filter": Filter,
		"tpl-list-tabs": ListTabs,
	},
	mixins: [navigator('TPL_TABLE2')],
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

<style lang="scss" scoped>
</style>
