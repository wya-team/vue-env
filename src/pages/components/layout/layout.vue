<template>
	<div class="c-layout">
		<div class="_header-bar g-flex-ac">
			<img >
			<span class="g-fs-20">后台管理中心</span>
			<i-select 
				v-model="curModule" 
				style="width:200px"
				@on-change="handleChangeModule"
			>
				<i-option 
					v-for="item in modules" 
					:value="item.value" 
					:key="item.value"
				>
					{{ item.name }}
				</i-option>
			</i-select>
		</div>
		<div class="g-flex">
			<left-menu 
				:menus="leftMenus"
			>
				<div slot="avatar">avatar</div>
			</left-menu>
			<div class="g-col _content g-relative">
				<top-menu 
					:menus="topMenus"
				/>
				<router-view class="v-router" />
			</div>
		</div>
	</div>
</template>

<script>
import { Select, Option } from 'iview';
import LeftMenu from './left';
import TopMenu from './top';
import modules from './config/modules';
import menus from './config/left/root';

export default {
	components: {
		"i-select": Select,
		"i-option": Option,
		"left-menu": LeftMenu,
		"top-menu": TopMenu
	},
	data() {
		return {
			curModule: this.$route.path.split('/')[1]
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
		}
	},
	watch: {

	},
	methods: {
		handleChangeModule(value) {
			this.curModule = value;
			this.$router.push(`${this.leftMenus[0].route}`);
		}
	}
};
</script>

<style lang="scss" scoped>
    .c-layout{
        /* border: 1px solid #d7dde4; */
        /* background: #f5f7f9; */
        position: relative;
        /* border-radius: 4px; */
        overflow: hidden;
    }
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
		padding-top: 112px;
		padding-left: 180px;
	}
	
</style>
