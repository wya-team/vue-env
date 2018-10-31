<template>
	<div :key="id">
		<div>{{ name }}</div>
		<div @click="handleResetFirst">回到首页刷新</div>
		<div @click="handleResetCur">当前页刷新</div>
	</div>
</template>

<script>
export default {
	name: "tpl-paging-piece-item",
	props: {
		id: [String, Number],
		name: String
	},
	methods: {
		handleResetFirst() {
			this.$store.commit('TPL_PAGING_PIECE_LIST_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_PAGING_PIECE_LIST_RESET');
		}
	}
};
</script>