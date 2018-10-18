<template>
	<set-title title="tpl-request" style="padding: 20px">
		<tpl-filter />
		<tpl-tabs-list />
	</set-title>
</template>

<script>
import TabsList from '@components/__tpl__/table3/tabs-list';
import Filter from '@components/__tpl__/table3/filter';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-request',
	components: {
		"tpl-tabs-list": TabsList,
		"tpl-filter": Filter,
	},
	mixins: [navigator('TPL_TABLE3')],
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