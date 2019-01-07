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
				`/tpl/paging/async`, 
				params
			));
			this.$store.commit('TPL_PAGING_ASYNC_LIST_INIT');
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

