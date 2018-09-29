<template>
	<div @click="$router.push('/tpl')">
		middleware
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'one',
	data() {
		return {
		};
	},
	created() {
		// this.$store.dispatch('request');
		let ajax1 = this.ajax('list');
		let ajax2 = this.ajax('details');
		// ajax1.cancel();
		// ajax2.cancel();
	},
	methods: {
		...mapActions(['ajax']),
	},
};
</script>

<style lang="scss" scoped>
</style>
