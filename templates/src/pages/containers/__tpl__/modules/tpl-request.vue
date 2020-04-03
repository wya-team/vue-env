<template>
	<set-title title="tpl-request">
		<tpl-content />
	</set-title>
</template>

<script>
import Content from '@components/__tpl__/request/content';

export default {
	name: 'tpl-request',
	components: {
		'tpl-content': Content
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

<style lang="scss">
</style>
