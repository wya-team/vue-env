<template>
	<div
		:style="{
			'left': `${leftMenuWidth ? leftMenuWidth + 12 : 0}px`,
			'width': `calc(100% - ${leftMenuWidth ? leftMenuWidth + 24 : 0}px)`
		}"
		class="c-footer g-flex-cc g-bs-t"
	>
		<slot>
			<vc-button
				v-if="cancelText"
				class="_cancel"
				type="default"
				@click="handleCancel"
			>
				{{ cancelText }}
			</vc-button>
			<vc-button
				v-if="okText"
				:disabled="okDisabled"
				type="primary"
				@click="handleOk"
			>
				{{ okText }}
			</vc-button>
		</slot>
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
			default: '保存',
		},
		okDisabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			leftMenuWidth: 0
		};
	},
	created() {
		this.$vc.on('layout-left-menu', this.setLeftDistance);
	},
	mounted() {
		// 让left-menu 再次告知它自己当前的宽度
		this.$vc.emit('layout-left-menu-emit-again', { emit: true });
	},
	destroyed() {
		this.$vc.off('layout-left-menu', this.setLeftDistance);
	},
	methods: {
		setLeftDistance({ distance }) {
			this.leftMenuWidth !== distance && (this.leftMenuWidth = distance);
		},
		handleCancel() {
			this.$emit('cancel');
		},
		handleOk() {
			this.$emit('ok');
		}
	}

};
</script>
<style lang="scss">
.c-footer {
	position: fixed;
	bottom: 0;
	height: 56px;
	background-color: #FFF;
	box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
	z-index: 50;
	._cancel {
		margin-right: 12px;
	}
}
</style>
