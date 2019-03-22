<template>
	<div class="c-layout-left-menu g-flex">
		<div class="_one-level">
			<div style="height: 56px">
				<slot name="logo" />
			</div>
			<div 
				v-for="(chunk, index) in chunks" 
				v-if="chunk.show"
				:key="index"
				:class="$route.path.indexOf(chunk.route) > -1 ? '__chunk-item-active' : '__chunk-item-unactive'" 
				class="__chunk-item"
				@click="handleLinkTo(chunk, 'one')"
			>
				<i class="iconfont icon-add g-m-r-10" />
				{{ chunk.name }}
			</div>
		</div>
		<div v-if="secondStatus" class="_two-level">
			<div class="__name">
				{{ chunkInfo.name }}
			</div>
			<div style="padding: 12px">
				<div 
					v-for="(menu, index) in childrenMenus" 
					v-if="menu.show"
					:key="index"
					:class="$route.path.indexOf(menu.route) > -1 ? '__menu-item-active' : '__menu-item-unactive'" 
					class="__menu-item"
					@click="handleLinkTo(menu, 'two')"
				>
					{{ menu.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'layout-left-menus',
	props: {
		menus: {
			type: Object,
			default() {
				return {};
			}
		},
		chunks: {
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
	computed: {
		chunkInfo() {
			let chunk = this.$route.path.split('/')[1];
			return this.chunks.find((it) => it.value === chunk) || {};
		},
		childrenMenus() {
			// 一级路由不用再left中配置导航文件，一级路由的menus为空
			let menus = this.menus[this.chunkInfo.value] || [];
			this.$store.commit('TOGGLE_SECOND_STATUS', menus.length > 0);
			return menus;
		},
		secondStatus() {
			return this.$store.state.layoutMain.secondStatus;
		}
	},
	methods: {
		handleLinkTo(menu, level) {
			this.$emit('click', menu);
			this.$router.push(this.getIndexRoute(menu));
			this.$store.commit('TOGGLE_SECOND_STATUS', this.childrenMenus.length > 0);
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
	left: 0;
	z-index: 4;
	height: 100vh;
	user-select: none;
	._one-level {
		width: 102px;
		background-color: $c444;
		.__chunk-item {
			height: 42px;
			line-height: 42px;
			padding-left: 23px;
			font-size: 15px;
			cursor: pointer;
		}
		.__chunk-item-unactive {
			color: $cbd;
			&:hover {
				background-color: $c67;
				transition: background-color 0.2s linear;
			}
		}
		.__chunk-item-active {
			background-color: $cf8;
			color: $c000;
		}
	}
	._two-level {
		width: 130px;
		background-color: $white;
		.__name {
			height: 56px; 
			line-height: 56px;
			font-size: 14px;
			color: $c000;
			border-bottom: 1px solid $cbd;
			border-right: 1px solid $cbd;
			text-align: center
		}
		.__menu-item {
			height: 32px;
			line-height: 32px;
			font-size: 14px;
			cursor: pointer;
			margin-bottom: 5px;
			text-align: center;

		}
		.__menu-item-unactive {
			color: $c67;
			&:hover {
				color: $main;
				transition: color 0.2s linear;
			}
		}
		.__menu-item-active {
			color: $c000;
			background: $cef;
			border-radius:4px;
		}
	}
}
</style>


