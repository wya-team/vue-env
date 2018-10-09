<template>
	<set-title title="Basic">
		<contents
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
		</contents>
	</set-title>
</template>

<script>
import Contents from '@components/__tpl__/basic/contents';

export default {
	name: 'tpl-basic',
	components: {
		Contents
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
