<template>
	<div class="c-layout">
		<!-- top和left顺序不要动，关系到emit和on的监听问题 -->
		<router-view name="top"/>
		<router-view name="left"/>
		<xls-layout-extra />
		<div :style="{ paddingTop, paddingLeft }">
			<router-view 
				:style="{ 
					minHeight, 
					marginTop: !paddingTop ? '0px' : '12px', 
					marginLeft: !paddingLeft ? '0px' : '16px',
					marginRight: !paddingLeft ? '0px' : '12px' 
				}" 
				class="v-router" 
			/>
		</div>		
	</div>
</template>

<script>
import Extra from './extra';

export default {
	name: 'xls-layout',
	components: {
		'xls-layout-extra': Extra
	},
	data() {
		return {
			paddingTop: 0,
			paddingLeft: 0,
			minHeight: ''
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
			console.log(distance);
			this.paddingTop = `${distance}px`;
			this.minHeight = `calc(100vh - ${distance + 12}px)`;
		},
		setContentPaddingLeft({ distance }) {
			this.paddingLeft = `${distance}px`;
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
		margin: 12px 12px 0 16px;
		background: $white;
	}
}
</style>
