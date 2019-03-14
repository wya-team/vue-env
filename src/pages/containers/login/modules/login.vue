<template>
	<set-title title="login">
		<tpl-content />
	</set-title>
</template>

<script>
import Content from '@components/login/content';

export default {
	name: 'login',
	components: {
		'tpl-content': Content
	},
	data() {
		return {
		};
	},
	created() {
		console.log('?');
	},
	methods: {
	},
};
</script>

<style lang="scss">
</style>
