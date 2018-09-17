<template>
	<set-title title="tpl-one">
		<contents />
	</set-title>
</template>

<script>
import Contents from '@components/__tpl__/one/contents';

export default {
	name: 'tpl-one',
	components: {
		Contents
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
