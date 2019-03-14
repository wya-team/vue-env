<template>
	<div class="c-layout">
		<div class="_header-bar g-flex-ac">
			<img >
			<span class="g-fs-20">后台管理中心</span>
			<vc-select 
				v-model="curModule" 
				style="width:200px"
				@on-change="handleChangeModule"
			>
				<vc-option 
					v-for="item in modules" 
					:value="item.value" 
					:key="item.value"
				>
					{{ item.name }}
				</vc-option>
			</vc-select>
		</div>
		<div class="g-flex">
			<left-menu 
				:menus="leftMenus"
			>
				<div slot="avatar">avatar</div>
			</left-menu>
			<div :style="{'padding-top': paddingTop}" class="g-col _content g-relative">
				<top-menu 
					ref="topBar"
					:menus="topMenus"
					:on-mounted="handeSetPaddingTop"
				/>
				<router-view class="v-router" />
			</div>
		</div>
	</div>
</template>

<script>
import LeftMenu from './left';
import TopMenu from './top';
import modules from './chunks';
import menus from './left/root';

const TOP_BAR_HEIGHT = 56;

export default {
	components: {
		"left-menu": LeftMenu,
		"top-menu": TopMenu
	},
	data() {
		return {
			curModule: this.$route.path.split('/')[1],
			paddingTop: '0px'
		};
	},
	computed: {
		modules() { // 用户可进入的模块
			return modules.filter((item) => item.show);
		},
		leftMenus() { // 当前模块下的菜单
			let curMenu = menus[this.curModule] || [];
			return curMenu.filter((item) => item.show);
		},
		topMenus() {
			let leftIndex = this.leftMenus.findIndex((item) => this.$route.path.indexOf(item.route) > -1);
			if (leftIndex === -1) return [];
			return this.leftMenus[leftIndex].children || [];
		},
	},
	beforeRouteEnter(to, from, next) {
		next();
	},
	beforeRouteUpdate(to, from, next) {
		this.$vc.clean();
		next();
	},
	beforeRouteLeave(to, from, next) {
		next();
	},
	methods: {
		handeSetPaddingTop(top) {
			this.paddingTop = top + TOP_BAR_HEIGHT + 'px';
		},
		handleChangeModule(value) {
			this.curModule = value;
			this.$router.push(`${this.leftMenus[0].route}`);
		}
	}
};
</script>

<style lang="scss">
.c-layout{
	position: relative;
	overflow: hidden;
	._header-bar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 56px;
		z-index: 10;
		background: #e84854;
		color: #ffffff;
		box-shadow: 0 1px 1px rgba(0,0,0,.1);
	}
	._content {
		padding-left: 180px;
	}
	.v-router {
		margin: 12px 12px 0 16px;
		background: #ffffff;
	}
}
</style>
