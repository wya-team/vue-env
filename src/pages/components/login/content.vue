<template>
	<i-form 
		ref="form" 
		:model="formValidate" 
		:rules="ruleValidate" 
		:label-width="120"
		style="height: 100vh" 
		position="left"
		class="g-flex-cc g-fd-c"
	>
		<i-form-item label="用户名:" prop="user">
			<i-input v-model="formValidate.user" placeholder="请输入用户名" />
		</i-form-item>
		<i-form-item label="密码:" prop="password">
			<i-input v-model="formValidate.password" placeholder="请输入密码" />
		</i-form-item>
		<div @click="handleLogin">
			登录
		</div> 	
	</i-form>
</template>

<script>
import { mapState } from 'vuex';
import { Form, FormItem, Input, InputNumber, Message } from 'iview';
import { setItem } from '@utils/utils';

export default {
	name: 'login',
	components: {
		'i-form': Form,
		'i-form-item': FormItem,
		'i-input': Input,
		'i-input-number': InputNumber,
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
		handleLogin() {
			this.$refs.form.validate((isValid) => {
				if (!isValid) return;
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
					setItem(`user_${this.$global.version}`, res);
					this.$router.replace('/tpl/main');

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
			});
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
