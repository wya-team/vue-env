<template>
	<div class="layout">
		<i-sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
			<i-menu :open-names="['1']" active-name="1-2" theme="dark" width="auto">
				<i-submenu name="1">
					<template slot="title">
						<i-icon type="ios-navigate"/>
						Item 1
					</template>
					<i-menu-item name="1-1">
						<router-link to="/tpl/paging/tabs">Option 1</router-link>
					</i-menu-item>
					<i-menu-item name="1-2">Option 2</i-menu-item>
					<i-menu-item name="1-3">Option 3</i-menu-item>
				</i-submenu>
				<i-submenu name="2">
					<template slot="title">
						<i-icon type="ios-keypad"/>
						Item 2
					</template>
					<i-menu-item name="2-1">Option 1</i-menu-item>
					<i-menu-item name="2-2">Option 2</i-menu-item>
				</i-submenu>
				<i-submenu name="3">
					<template slot="title">
						<i-icon type="ios-analytics"/>
						Item 3
					</template>
					<i-menu-item name="3-1">Option 1</i-menu-item>
					<i-menu-item name="3-2">Option 2</i-menu-item>
				</i-submenu>
			</i-menu>
		</i-sider>
		<i-layout :style="{marginLeft: '200px'}">
			<i-header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"/>
			<i-content :style="{padding: '0 16px 16px'}">
				<router-view class="v-router" />
			</i-content>
		</i-layout>
	</div>
</template>
<script>
import { Menu, MenuItem, Icon, Layout, Sider, Header, Content, Submenu } from 'iview';

export default {
	components: {
		'i-menu': Menu,
		'i-menu-item': MenuItem,
		'i-icon': Icon,
		'i-layout': Layout,
		'i-sider': Sider,
		'i-header': Header,
		'i-content': Content,
		'i-submenu': Submenu,
	},
	data() {
		return {
			isCollapsed: false
		};
	},
	computed: {
		rotateIcon() {
			return [
				'menu-icon',
				this.isCollapsed ? 'rotate-icon' : ''
			];
		},
		menuitemClasses() {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			];
		}
	},
	methods: {
		collapsedSider() {
			this.$refs.target.toggleCollapse();
		}
	}
};
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
