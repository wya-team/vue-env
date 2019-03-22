<template>
	<div class="c-layout">
		<div class="g-flex">
			<left-menu 
				:menus="menus"
				:chunks="chunks"
			>
				<div slot="logo">logo</div>
			</left-menu>
			<div 
				:style="{
					'padding-top': paddingTop, 
					'padding-left': secondStatus ? '232px' : '102px'
				}" 
				class="g-col g-relative">
				<top-menu 
					ref="topBar"
					:menus="menus"
					:chunks="chunks"
					:on-mounted="handeSetPaddingTop"
				>
					<div>头像</div>
				</top-menu>
				<router-view class="v-router" />
			</div>
		</div>
	</div>
</template>

<script>
import LeftMenu from './left';
import TopMenu from './top'; 
import menus from './left/root';
import chunks from './chunks';

export default {
	components: {
		"left-menu": LeftMenu,
		"top-menu": TopMenu
	},
	data() {
		return {
			curModule: this.$route.path.split('/')[1],
			paddingTop: '0px',
			menus,
			chunks: chunks.filter((chunk) => chunk.show),
		};
	},
	computed: {
		secondStatus() {
			return this.$store.state.layoutMain.secondStatus;
		}
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
			this.paddingTop = top + 'px';
		},
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
		background: $orange-dark;
		color: $white;
		box-shadow: 0 1px 1px rgba(0,0,0,.1);
	}
	._content {
		padding-left: 232px;
	}
	.v-router {
		margin: 12px 12px 0 16px;
		background: $white;
	}
}
</style>
