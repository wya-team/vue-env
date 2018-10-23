<template>
	<set-title title="tpl-form">
		<tpl-contents />
	</set-title>
</template>

<script>
import Contents from '@components/__tpl__/form/contents';

export default {
	name: 'tpl-form',
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
