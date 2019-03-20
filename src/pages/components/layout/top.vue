<template>
	<div 
		:style="{
			'left': secondStatus ? '232px' : '102px'
		}"
		class="c-layout-top-bar g-flex g-jc-sb" 
	>
		<div v-if="typeof topMenus === 'string'" class="_name">
			{{ topMenus }}
		</div>
		<div v-else-if="(topMenus instanceof Array) === true" class="g-flex-ac g-fw-w">
			<div 
				v-for="(menu) in topMenus"
				:key="menu.route"
				:class="$route.path.indexOf(formatRoute(menu.route)) > -1 ? '_menu-item-active' : '_menu-item-unactive'" 
				class="_menu-item"
				@click="handleLinkTo(menu.route)"
			>
				{{ menu.name }}
			</div>
		</div>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'layout-top-nav',
	props: {
		onMounted: {
			type: Function,
			default: () => {}
		},
		chunks: {
			type: Array,
			default() {
				return [];
			}
		},
		menus: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {};
	},
	computed: {
		chunkInfo() {
			let chunk = this.$route.path.split('/')[1];
			return this.chunks.find((it) => it.value === chunk) || {};
		},
		topMenus() {
			return this.getTopMenu();
		},
		secondStatus() {
			return this.$store.state.layoutMain.secondStatus;
		}
	},
	mounted() {
		this.getTopBarHeight();
	},
	updated() {
		this.getTopBarHeight();
	},
	methods: {
		getTopBarHeight() {
			const { onMounted } = this;
			onMounted && onMounted(this.$el.clientHeight);
		},
		getRouteArr() {
			let arr = this.$route.path.split('/');
			arr.shift();
			return arr;
		},
		getTopMenu() {
			let routeArr = this.getRouteArr();
			let menus = this.menus[this.chunkInfo.value] || []; // 模块内的菜单（二级）
			let second = this.$route.path.split('/')[2];
			let secondMenu = menus.find((it) => this.$route.path.indexOf(it.route) > -1);
			switch (routeArr.length) {
				case 1:
					return this.chunkInfo.name;
				case 2:
					return secondMenu ? secondMenu.name : this.chunkInfo.name;
				default:
					return secondMenu ? secondMenu.children || [] : this.chunkInfo.name;
			}
		},
		handleLinkTo(route) {
			this.$router.push(route);
		},
		formatRoute(route = '', child) {
			let array = route.split('/');
			array.length = child ? 5 : 4;
			return array.join('/');
		},
	}
};
</script>

<style lang="scss">
@import '../../../css/core/color.scss';

.c-layout-top-bar {
	position: fixed;
	top: 0px;
	right: 0;
	z-index: 999;
	background-color: #ffffff;
	padding: 0 15px;
	border-bottom: 1px solid #e1e3e5;
	height: 56px;
	._name {
		font-size:14px;
		color:#000000;
		height: 56px;
		line-height: 56px;
		padding-left: 21px;
	}
	._menu-item {
		height: 56px;
		line-height: 56px;
		font-size: 14px;
		margin-right: 48px;
		cursor: pointer;
	}
	._menu-item-unactive {
		color: #000000;
		opacity: 0.8;
		&:hover {
			opacity: 1;			
			will-change: opacity;
			transition: opacity 0.2s ease-in-out;
		}
	}
	._menu-item-active {
		color: $main;
		border-bottom: 2px solid $main;
		box-sizing: border-box
	}
}
</style>


