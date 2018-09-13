<template>
	<set-title title="Basic">
		<basic
			:app-name="appName" 
			v-bind="user" 
			@diyEvent="handleDiyEvent"
		>
			<template slot="first">
				<div>first</div>
			</template>
			<template slot="second">
				<div>second</div>
			</template>
		</basic>
	</set-title>
</template>

<script>
import Basic from '@components/__tpl__/basic';

export default {
	name: 'tpl',
	components: {
		Basic
	},
	data() {
		return {
			appName: 'vue-env',
			user: {
				name: 'wya',
				dev: false
			}
		};
	},
	created() {
	},
	methods: {
		handleDiyEvent() {
			console.log('我被子组件触发了');
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
