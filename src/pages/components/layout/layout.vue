<template>
	<div class="c-layout">
		<!-- top和left顺序不要动，关系到emit和on的监听问题 -->
		<router-view name="top" />
		<router-view name="left" />
		<div :style="{ paddingTop, paddingLeft }">
			<div
				:style="{
					minHeight,
					marginTop: !paddingTop ? '0px' : '12px',
					marginLeft: !paddingLeft ? '0px' : '12px',
					marginRight: !paddingLeft ? '0px' : '12px',
				}"
				class="v-router"
			>
				<router-view
					:style="{
						minWidth: `${minWidth}px`,
						overflowX: 'auto'
					}"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'xls-layout',
	components: {
	},
	data() {
		return {
			paddingTop: 0,
			paddingLeft: 0,
			minHeight: '',
			minWidth: 1024,
		};
	},
	computed: {
	},
	beforeRouteEnter(to, from, next) {
		next();
	},
	beforeRouteUpdate(to, from, next) {
		this.$vc.clear();
		next();
	},
	beforeRouteLeave(to, from, next) {
		next();
	},
	created() {
		this.$vc.on('layout-top-menu', this.setContentPaddingTop);
		this.$vc.on('layout-left-menu', this.setContentPaddingLeft);
	},
	destroyed() {
		this.$vc.off('layout-top-menu', this.setContentPaddingTop);
		this.$vc.off('layout-left-menu', this.setContentPaddingLeft);
	},
	methods: {
		// set
		setContentPaddingTop({ distance }) {
			this.paddingTop = distance ? `${distance}px` : 0;
			this.minHeight = `calc(100vh - ${distance + 12}px)`;
		},
		setContentPaddingLeft({ distance }) {
			let marginLR = 24;
			this.paddingLeft = distance ? `${distance}px` : 0;
			this.minWidth = 1024 - distance - marginLR;
		},
	}
};
</script>

<style lang="scss">
.c-layout{
	position: relative;
	overflow: hidden;
	._content {
		padding-left: 232px;
	}
	.v-router {
		overflow-x: auto;
		margin: 12px 12px 0 16px;
		background-color: $white;
	}
}
</style>
