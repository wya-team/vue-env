<template>
	<div class="c-layout-left-menu">
		<slot name="avatar" />
		<div 
			v-for="(menu, index) in menus" 
			:key="index"
			:class="$route.path.indexOf(menu.route) > -1 ? '_menu-item-active' : '_menu-item-unactive'" 
			class="_menu-item"
			@click="handleLinkTo(menu)"
		>
			<i class="iconfont icon-add g-m-r-10" />
			{{ menu.name }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'layout-left-menus',
	props: {
		menus: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {

		};
	},
	created() {
		console.log(this.menus);
	},
	methods: {
		handleLinkTo(menu) {
			this.$emit('click', menu);
			this.$router.push(this.getIndexRoute(menu));
		},
		getIndexRoute(menu) {
			if (!menu.children) {
				return menu.route;
			} else {
				return menu.children.filter((item) => item.show)[0].route;
			}
		}
	}
};
</script>

<style lang="scss">
.c-layout-left-menu {
	position: fixed;
	top: 56px;
	left: 0;
	z-index: 4;
	background-color: #f5f5f7;
	width: 180px;
	height: calc(100vh - 56px);
	._menu-item {
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		font-size: 14px;
		cursor: pointer;
		margin-bottom: 8px;
	}
	._menu-item-unactive {
		color: #717274;
		opacity: 0.8;
		&:hover {
			background-color: #f2f1f4;
			opacity: 1;			
			will-change: opacity;
			transition: opacity 0.2s ease-in-out;
		}
	}
	._menu-item-active {
		background-color: #eeedf2;
		color: #f14b5f;
		border-left: 4px solid #f14b5f;
	}
}
</style>


