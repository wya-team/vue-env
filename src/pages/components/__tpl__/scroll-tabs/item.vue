<template>
	<div>
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
		<p>占位</p>
		<p>占位</p>
		<div @click="handleResetFirst">刷新</div>
	</div>
</template>

<script>
export default {
	name: 'v-tpl-item',
	components: {

	},
	props: {

	},
	data() {
		return {
		};
	},
	computed: {

	},
	watch: {
		
	},
	created() {
		
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
