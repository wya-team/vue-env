<template>
	<set-title title="tpl-scroll-basic">
		<tpl-list />
	</set-title>
</template>

<script>
import List from '@components/__tpl__/scroll-basic/list';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-scroll-basic',
	components: {
		"tpl-list": List
	},
	mixins: [navigator('TPL_SCROLL_BASIC')],
	data() {
		return {
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
