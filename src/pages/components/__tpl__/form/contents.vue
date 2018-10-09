<template>
	<div>
		<input v-fv-check="{rules: ['required']}" id="user-name" >
		<span v-fv-msg="'user-name'" />
		<div @click="handleClick">Button </div>
	</div>
</template>

<script>
import * as types from '@mutations/__tpl__';

export default {
	name: 'tpl-form-contents',
	data() {
		return {
		};
	},
	methods: {
		handleClick() {
			this.$fv.checkAll('', (errors) => {
				console.log(errors);
			});
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
