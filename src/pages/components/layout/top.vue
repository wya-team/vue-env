<template>
	<div v-if="menus.length > 0" class="c-layout-top-bar g-flex-cc">
		<div 
			v-for="(menu, index) in menus"
			:key="index"
			:class="$route.path.indexOf(formatRoute(menu.route)) > -1 ? '_menu-item-active' : '_menu-item-unactive'" 
			class="_menu-item"
			@click="handleLinkTo(menu.route)"
		>
			{{ menu.name }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'layout-top-nav',
	props: {
		menus: {
			type: Array,
			default() { return []; }
		}
	},
	methods: {
		handleLinkTo(route) {
			this.$emit('click', this.formatRoute(route));
			this.$router.push(route);
		},
		formatRoute(route = '') {
			let array = route.split('/');
			array.length = 4;
			return array.join('/');
		}
	}
};
</script>

<style lang="scss" scoped>
.c-layout-top-bar {
	position: fixed;
	top: 56px;
	left: 180px;
	height: 60px;
	line-height: 60px;
	width: 100%;
	z-index: 4;
	background-color: #ffffff;
	border-bottom: 1px solid #e1e3e5;
	._menu-item {
		height: 60px;
		line-height: 60px;
		font-size: 16px;
		margin-right: 40px;
		cursor: pointer;
	}
	._menu-item-unactive {
		color: #8e9096;
		opacity: 0.8;
		&:hover {
			opacity: 1;			
			will-change: opacity;
			transition: opacity 0.2s ease-in-out;
		}
	}
	._menu-item-active {
		color: #f14b5f;
		border-bottom: 3px solid #f14b5f;
		box-sizing: border-box
	}
}
</style>


