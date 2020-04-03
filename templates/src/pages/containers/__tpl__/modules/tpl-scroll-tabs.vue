<template>
	<set-title title="tpl-scroll-basic">
		<tpl-tabs-list />
	</set-title>
</template>

<script>
import TabsList from '@components/__tpl__/scroll-tabs/tabs-list';
import navigator from '@extends/mixins/navigator';

export default {
	name: 'tpl-scroll-basic',
	components: {
		"tpl-tabs-list": TabsList
	},
	mixins: [navigator('TPL_SCROLL_TABS')],
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
