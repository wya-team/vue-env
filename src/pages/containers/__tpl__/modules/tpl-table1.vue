<template>
	<set-title title="tpl-request" style="padding: 20px">
		<tpl-filter />
		<tpl-list />
	</set-title>
</template>

<script>
import List from '@components/__tpl__/table1/list';
import Filter from '@components/__tpl__/table1/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-request',
	components: {
		"tpl-list": List,
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
