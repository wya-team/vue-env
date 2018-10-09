<template>
	<!-- <div @click="$router.push('/tpl')"> -->
	<div>
		middleware
	</div>
</template>

<script>
import * as types from '@mutations/__tpl__';

export default {
	name: 'one',
	data() {
		return {
		};
	},
	created() {
		this.request({
			url: types.TPL_REQUEST_POST,
			type: 'POST',
			localData: {
				status: 1,
				data: {
					user: 'wya'
				}
			}
		}).then((res) => {
			
		}).catch((res) => {
			console.log(res);
		});
		// this.$request({
		// 	url: 'https://wyaoa-new.ruishan666.com/human/login/login.json',
		// 	type: 'POST',
		// 	localData: {
		// 		status: 1,
		// 		data: {
		// 		}
		// 	}
	},
	methods: {
		
	},
};
</script>

<style lang="scss" scoped>
</style>
