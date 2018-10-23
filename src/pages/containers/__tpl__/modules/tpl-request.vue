<template>
	<set-title title="tpl-request">
		<tpl-contents />
	</set-title>
</template>

<script>
import Contents from '@components/__tpl__/request/contents';

export default {
	name: 'tpl-request',
	components: {
		'tpl-contents': Contents
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
