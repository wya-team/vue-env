<template>
	<div>
		<i-input
			v-model="keyword" 
			size="large" 
			placeholder="请输入关键字搜索" 
			style="width: 320px" 
		/>
		<i-button 
			type="primary"
			@click="handleSearch"
		>
			搜索
		</i-button>
	</div>
</template>

<script>
import { Input, Button } from 'iview';
import { getParseUrl, getHashUrl } from '@utils/utils';

export default {
	name: 'tpl-filter1',
	components: {
		'i-input': Input,
		'i-button': Button,
	},
	data() {
		const { query = {} } = this.$route;
		return {
			keyword: String(query.keyword || ''),
		};
	},
	methods: {
		handleSearch(event) {
			this.$router.replace(getHashUrl(
				`/tpl/paging/native`, 
				{ ...this.$route.query, keyword: this.keyword }
			));
			this.$store.commit('TPL_PAGING_NATIVE_SEARCH_INIT');
		}
	}
};

</script>

<style lang="scss" scoped>

</style>
