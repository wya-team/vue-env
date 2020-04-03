<template>
	<div :key="it.id">
		<p>{{ it }}</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<p>占位</p>
		<router-link to="/tpl/main">
			/tpl/main
		</router-link>
		<div @click="handleResetFirst">
			刷新
		</div>
	</div>
</template>

<script>
export default {
	name: 'v-tpl-item',
	components: {

	},
	props: {
		it: Object
	},
	data() {
		return {
		};
	},
	computed: {

	},
	watch: {
		
	},
	updated() {
	},
	methods: {
		handleResetFirst() {
			this.$store.commit('TPL_SCROLL_BASIC_LIST_INIT');
		}
	},
};
</script>

<style lang="scss">
</style>
