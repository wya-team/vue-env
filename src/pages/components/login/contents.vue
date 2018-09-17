<template>
	<div @click="$router.push('/tpl')">
		login
	</div>
</template>

<script>
import Contents from '@components/login/contents';

export default {
	name: 'login',
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
