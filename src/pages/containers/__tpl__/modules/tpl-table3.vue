<template>
	<set-title title="tpl-request" style="padding: 20px">
		<tpl-filter />
		<tpl-list-tabs />
	</set-title>
</template>

<script>
import ListTabs from '@components/__tpl__/table3/list-tabs';
import Filter from '@components/__tpl__/table3/filter';

export default {
	name: 'tpl-request',
	components: {
		"tpl-list-tabs": ListTabs,
		"tpl-filter": Filter,
	},
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