<template>
	<div 
		:style="{
			'left': secondStatus ? '248px' : '118px',
			'width': secondStatus ? 'calc(100% - 260px)' : 'calc(100% - 130px)'
		}"
		class="c-footer g-flex-cc g-bs-t">
		<vc-button 
			class="_cancel" 
			type="default" 
			@click="$emit('cancel');"
		>
			{{ cancelText }}
		</vc-button>
		<vc-button 
			type="primary"
			@click="$emit('ok')"
		>
			{{ okText }}
		</vc-button>
	</div>
</template>
<script>

export default {
	name: 'xls-footer',
	components: {
	},
	props: {
		cancelText: {
			type: String,
			default: '取消',
		},
		okText: {
			type: String,
			default: '确认',
		}
	},
	data() {
		return {
		};
	},
	computed: {
		secondStatus() {
			return this.$store.state.layoutMain.secondStatus;
		}
	},
	methods: {
	
	}
    
};
</script>
<style lang="scss">
.c-footer {
	position: fixed;
	bottom: 0;
	
	height: 56px;
	background-color: $white;
	box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
	._cancel {
		margin-right: 12px;
	}
}
</style>

