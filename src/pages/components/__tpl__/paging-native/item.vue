<template>
	<tbody>
		<template v-for="item in dataSource">
			<vc-fragment :key="item.id">
				<tr>
					<td colspan="4">
						{{ item.name }}
					</td>
				</tr>
				<tr>
					<td>
						<div class="_table-cell">
							111
						</div>
					</td>
					<td rowspan="2">
						<div class="_table-cell">
							222
						</div>
					</td>
					<td>
						<div class="_table-cell">
							333
						</div>
					</td>
					<td rowspan="2">
						<div class="_table-cell">
							444
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="_table-cell" @click="handleResetFirst">
							回到首页刷新
						</div>
					</td>
					<td>
						<div class="_table-cell" @click="handleResetCur">
							当前页刷新
						</div>
					</td>
				</tr>
			</vc-fragment>
		</template>
	</tbody>
</template>
<script>

export default {
	name: 'vc-fragment-item',
	components: {
		'vc-fragment': Fragment
	},
	props: {
		dataSource: {
			type: Array,
			default: () => ([])
		},
	},
	created() {
	},
	methods: {
		handleResetFirst() {
			this.$store.commit('TPL_PAGING_NATIVE_LIST_INIT');
		},
		handleResetCur() {
			this.$store.commit('TPL_PAGING_NATIVE_LIST_RESET');
		},
		handleLinkTo() {
			this.$router.push('/tpl/paging/tabs');
		},
	}
};
</script>