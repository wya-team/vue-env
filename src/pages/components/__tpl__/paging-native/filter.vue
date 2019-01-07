<template>
	<div class="js-filter">
		<div>
			<i-input
				v-model="keywords.search" 
				placeholder="请输入关键字搜索" 
				style="width: 300px" 
				clearable
				@on-enter="handleSearch"
				@on-change="handleInputChange"
			/>
			<i-button 
				type="primary"
				class="g-m-l-10"
				@click="handleSearch"
			>
				搜索
			</i-button>
			<span
				class="g-m-l-20 g-c-black-dark g-fs-12 g-pointer"
				@click="handleToggle"
			>
				更多搜索条件
				<i
					:class="show ? 'icon-triangle-up' : 'icon-triangle-down'"
					class="iconfont g-fs-12 g-c-black-dark"
				/>
			</span>
		</div>
		<vc-expand 
			ref="expand"
			v-model="show"
		>
			<div 
				class="g-m-t-10 g-pd-lr-10 g-lh-42 g-bg-gray-mid"
				style="padding-top: 3px;padding-bottom: 7px;"
			>
				<i-input
					v-model="keywords.name" 
					class="g-m-r-5"
					style="width: 220px" 
					placeholder="请输入公司名称" 
					@on-enter="handleSearch"
					@on-change="handleInputChange"
				/>
				<i-date-picker
					:value="keywords.create_time"
					type="date"
					class="g-m-r-5"
					style="width: 220px;"
					placeholder="请选择录入时间"
					@on-change="handleChange({create_time: arguments[0]})"
				/>
			</div>
		</vc-expand>
	</div>
</template>

<script>
import { Input, Button, DatePicker } from 'iview';
import { Expand } from 'wya-vc';
import { getParseUrl, getHashUrl } from '@utils/utils';
import { debounce } from 'lodash';

export default {
	name: 'tpl-filter2',
	components: {
		'i-input': Input,
		'i-button': Button,
		'i-date-picker': DatePicker,
		'vc-expand': Expand,
	},
	data() {
		const { query = {} } = this.$route;
		return {
			keywords: {
				search: String(query.search || ''),
				name: String(query.name || ''),
			},
			show: false
		};
	},
	methods: {
		handleSearch: debounce(function (value) {
			let params = {
				...this.$route.query,
				...this.keywords,
			};
			this.$router.replace(getHashUrl(
				`/tpl/paging/native`, 
				params
			));
			this.$store.commit('TPL_PAGING_NATIVE_LIST_INIT');
		}, 300),
		handleToggle() {
			this.$refs.expand.toggle();
		},
		handleChange(obj) {
			let type = Object.keys(obj)[0];
			let value = obj[type];
			this.keywords[type] = value;
			this.handleSearch();
		},
		handleInputChange(e) {
			if (!e.target.value) {
				this.handleSearch();
			}
		},
	}
};

</script>

<style lang="scss" scoped>

</style>

