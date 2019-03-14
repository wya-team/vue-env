<template>
	<set-title title="Basic">
		<tpl-content
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
		</tpl-content>
	</set-title>
</template>

<script>
import Content from '@components/__tpl__/basic/content';

export default {
	name: 'tpl-basic',
	components: {
		'tpl-content': Content
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

<style lang="scss">
</style>
