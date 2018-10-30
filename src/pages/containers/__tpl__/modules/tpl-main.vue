<template>
	<set-title title="链接">
		<tpl-links />
	</set-title>
</template>

<script>
import Links from '@components/__tpl__/main/links';

export default {
	name: 'tpl-main',
	components: {
		'tpl-links': Links
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
