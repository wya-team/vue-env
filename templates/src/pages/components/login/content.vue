<template>
	<vc-form 
		ref="form" 
		:model="formValidate" 
		:rules="ruleValidate" 
		:label-width="120"
		style="height: 100vh" 
		position="left"
		class="g-flex-cc g-fd-c"
	>
		<vc-form-item label="用户名： " prop="user">
			<vc-input v-model="formValidate.user" placeholder="请输入用户名" />
		</vc-form-item>
		<vc-form-item label="密码： " prop="password">
			<vc-input v-model="formValidate.password" placeholder="请输入密码" />
		</vc-form-item>
		<div @click="handleLogin">
			登录
		</div> 	
	</vc-form>
</template>

<script>
import { mapState } from 'vuex';
import { Message } from '@wya/vc';
import { Storage } from '@utils/utils';
import { createLoginAuth } from '@routers/hooks';

export default {
	name: 'login',
	components: {
	},
	data() {
		return {
			formValidate: {
				user: '',
				password: '',
			},
			ruleValidate: {
				user: [
					{ required: true, message: '请输入用户名' }
				],
				password: [
					{ required: true, message: '请输入密码' }
				],
			}
		};
	},
	computed: {
		...mapState(['loginMain'])
	},
	created() {
		
	},
	methods: {
		async handleLogin() {
			try {
				await this.$refs.form.validate();
				this.request({
					url: 'LOGIN_MAIN_POST',
					type: 'POST',
					localData: {
						status: 1,
						data: {
							...this.formValidate
						}
					}
				}).then((res) => {
					Message.success(`登录成功 - userName: ${this.loginMain.user}`);

					createLoginAuth(res.data);
				}).catch((res) => {
					console.log(res);
				});
			} catch (e) {
				console.log(e);
			}
		}
	},
};
</script>

<style lang="scss">
</style>
