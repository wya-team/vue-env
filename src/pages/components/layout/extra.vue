<!-- 其他：用户头像、通知 -->
<template>
	<div class="v-layout-extra g-flex-ac">
		<img :src="user.avatar" class="g-imgc-32 g-m-r-10">
		<vc-dropdown 
			placement="bottom"
			trigger="click"
			@click="handleOperate"
		>
			<p class="g-pointer">
				admin
			</p>
			<vc-dropdown-menu slot="list">
				<vc-dropdown-item name="set">
					<div class="line">
						个人账户设置
					</div>	 
				</vc-dropdown-item>
				<vc-dropdown-item name="change">
					<div class="line">
						修改密码
					</div>	 
				</vc-dropdown-item>
				<vc-dropdown-item name="logout">
					<div class="line no-border">
						退出登录
					</div>	 
				</vc-dropdown-item>
			</vc-dropdown-menu>
		</vc-dropdown>
	</div>
</template>

<script>
import { Storage } from '@utils/utils';

export default {
	name: 'xls-layout-extra',
	components: {

	},
	props: {

	},
	data() {
		return {
			user: {}
		};
	},
	computed: {

	},
	watch: {
		
	},
	methods: {
		handleOperate(name) {
			
		},
	},
};
</script>

<style lang="scss">
.v-layout-extra {
	position: fixed;
	top: 0;
	right:30px;
	z-index: 1000;
	height: 55px;
}
</style>
