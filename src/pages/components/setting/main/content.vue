<template>
	<ul>
		<li v-for="(item, index) in list" v-if="String(index)" :key="index">
			<router-link :to="item.path">{{ item.name }}</router-link>
			<vc-clipboard :value="item.path" tag="span">复制</vc-clipboard>
		</li>
	</ul>
	
</template>

<script>
import { settingConfig } from '@containers/setting/app';

export default {
	name: 'tpl-links',
	components: {
	},
	data() {
		return {
			list: settingConfig
		};
	},
	created() {
	},
	methods: {
	},
};
</script>

<style lang="scss">
</style>
