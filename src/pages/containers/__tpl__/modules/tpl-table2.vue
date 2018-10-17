<template>
	<set-title title="tpl-request" style="padding: 20px">
		<tpl-filter />
		<tpl-list-tabs />
	</set-title>
</template>

<script>
import ListTabs from '@components/__tpl__/table2/list-tabs';
import Filter from '@components/__tpl__/table2/filter';

export default {
	name: 'tpl-request',
	components: {
		"tpl-filter": Filter,
		"tpl-list-tabs": ListTabs,
	},
	data() {
		return {
		};
	},
	created() {
	},
	destroyed() {
		this.$store.commit('ROUTE_CHANGED');
	},
	methods: {
	},
};
</script>

<style lang="scss" scoped>
</style>
