<template>
	<set-title title="login">
		<tpl-content />
	</set-title>
</template>

<script>
import Content from '@components/login/content';

export default {
	name: 'login',
	components: {
		'tpl-content': Content
	}
};
</script>

<style lang="scss">
</style>
