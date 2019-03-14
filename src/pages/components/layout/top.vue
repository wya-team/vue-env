<template>
	<div class="c-layout-top-bar">
		<div v-if="menus.length > 0" class="_bar g-flex-cc g-fw-w">
			<div 
				v-for="(menu) in menus"
				:key="menu.route"
				:class="$route.path.indexOf(formatRoute(menu.route)) > -1 ? '__menu-item-active' : '__menu-item-unactive'" 
				class="__menu-item"
				@click="handleLinkTo(menu.route, menu.children)"
			>
				{{ menu.name }}
			</div>
		</div>
		<div v-if="childRoute.length > 0" class="_child-bar g-flex-ac g-fw-w" >
			<div
				v-for="(child) in childRoute"
				:key="child.route"
				:class="$route.path.indexOf(formatRoute(child.route, true)) > -1 ? '__child-item-active' : '__child-item-unactive'" 
				class="__child-item"
				@click="handleLinkTo(child.route)"
			>
				{{ child.name }}
			</div>
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
		},
		onMounted: {
			type: Function,
			default: () => {}
		}
	},
	computed: {
		curRoute() {
			return this.$route.path;
		},
		childRoute() {
			let routes = this.menus.filter((item) => {
				return item.route === this.formatRoute(this.curRoute);
			});

			if (routes[0] && routes[0].children) {
				return routes[0].children.filter((item) => {
					return item.show;
				}); 
			}
			return [];
		}
	},
	mounted() {
		this.getTopBarHeight();
	},
	updated() {
		this.getTopBarHeight();
	},
	methods: {
		handleLinkTo(route, children) {
			if (children) {
				let routes = children.filter((item) => item.show);
				this.$emit('click', routes[0].route);
				this.$router.push(routes[0].route);
			} else {
				this.$emit('click', route);
				this.$router.push(route);
			}
		},
		formatRoute(route = '', child) {
			let array = route.split('/');
			array.length = child ? 5 : 4;
			return array.join('/');
		},
		getTopBarHeight() {
			const { onMounted } = this;
			onMounted && onMounted(this.$el.clientHeight);
		}
	}
};
</script>

<style lang="scss">
.c-layout-top-bar {
	position: fixed;
	top: 56px;
	left: 180px;
	right: 0;
	z-index: 4;
	background-color: #ffffff;
	._bar {
		border-bottom: 1px solid #e1e3e5;
		.__menu-item {
			height: 60px;
			line-height: 60px;
			font-size: 16px;
			margin-right: 40px;
			cursor: pointer;
		}
		.__menu-item-unactive {
			color: #8e9096;
			opacity: 0.8;
			&:hover {
				opacity: 1;			
				will-change: opacity;
				transition: opacity 0.2s ease-in-out;
			}
		}
		.__menu-item-active {
			color: #f14b5f;
			border-bottom: 3px solid #f14b5f;
			box-sizing: border-box
		}
	}
	
	._child-bar {
		padding: 0 30px;
		box-shadow: 0 5px 12px -3px rgba(221, 222, 225, 0.5);
		.__child-item {
			height: 42px;
			line-height: 42px;
			font-size: 14px;
			margin-right: 40px;
			cursor: pointer;
		}
		.__child-item-unactive {
			color: #333333;
			opacity: 0.8;
			&:hover {
				opacity: 1;	
				color: #f14b5eb1;		
				will-change: opacity;
				transition: all 0.2s ease-in-out;
			}
		}
		.__child-item-active {
			color: #f14b5f;
			box-sizing: border-box
		}
	}
}
</style>


