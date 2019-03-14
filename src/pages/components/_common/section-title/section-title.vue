<template>
	<div 
		:class="!nobg && 'g-bg-f9'"
		class="g-flex c-section-title"
	>
		<div class="g-flex g-m-l-12">
			{{ title }}
		</div>
		<slot />
	</div>
</template>
<script>
export default {
	name: 'xls-section-title',
	components: {

	},
	props: {
		title: '',
		nobg: Boolean, // 是否需要背景
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
.c-section-title {
	color: #000;
	font-size: 14px;
	padding: 0 24px;
	line-height: 50px;
	font-weight: bold;
	&::before {
		content: '';
		width: 2px;
		height: 14px;
		background-color: #e6686b;
		margin: 18px 7px 0 0;
	}
}
</style>


