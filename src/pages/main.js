import '../css/global.scss';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

/**
 * 注册一个**全局组件**，这里只用于测试
 */
Vue.component('MyComponent', {
	props: {
		index: String,
	},
	methods: {
		handleClick() {
			console.log(2);
			this.$emit("diyEvent");
		}
	},
	template: `
		<div>
			<br>
			<br>
			<br>
			<br>
			<br>
			<div @click="handleClick">自定义组件{{ index }} -> 点我</div>
		</div>
	`,
});

/* eslint-disable no-new */
new Vue({
	el: '#pages',
	components: { App },
	data: {
		appName: 'vue-env',
		user: {
			name: 'wya',
			dev: false
		}
	},
	created() {
		// console.log();
	},
	methods: {
		handleDiyEvent() {
			console.log('我被子组件触发了');
		}
	},
	/**
	 * 1. 要使用v-bind或简写:绑定数组，否则就是你传的那个字符串
	 * 2. v-bind 会自己解构成 :name="user.name" :dev="user.dev"
	 * 3. class 会被合并
	 */
	template: `
		<App 
			:appName="appName" 
			v-bind="user" 
			class="pages" 
			v-on:diyEvent="handleDiyEvent"
		>
			<MyComponent v-on:diyEvent="handleDiyEvent" slot="first" index="1"/>
			<MyComponent v-on:diyEvent="handleDiyEvent" slot="default" index="2"/>
		</App>
	`,
});
