<template>
	<div @click="handleLogin">
		点我 ... userName: {{ loginMain.user }}
	</div>
</template>

<script>
import { mapState } from 'vuex';

import Contents from '@components/login/contents';
import * as types from '@mutations/login';

export default {
	name: 'login',
	components: {
		Contents
	},
	data() {
		return {
		};
	},
	computed: {
		...mapState(['loginMain'])
	},
	created() {
		
	},
	methods: {
		handleLogin() {
			this.request({
				url: types.LOGIN_MAIN_POST,
				type: 'POST',
				localData: {
					status: 1,
					data: {
						user: 'wya'
					}
				}
			}).then((res) => {
				console.log(res);
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
			// }).then((res) => {
			// 	console.log(res);
			// }).catch((res) => {
			// 	console.log(res);
			// });
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
