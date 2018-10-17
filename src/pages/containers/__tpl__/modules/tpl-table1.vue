<template>
	<set-title title="tpl-request" style="padding: 20px">
		<tpl-filter />
		<tpl-table />
	</set-title>
</template>

<script>
import Table from '@components/__tpl__/table1/table';
import Filter from '@components/__tpl__/table1/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-request',
	components: {
		"tpl-table": Table,
		"tpl-filter": Filter,
	},
	mixins: [navigator('TPL_TABLE1')],
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
