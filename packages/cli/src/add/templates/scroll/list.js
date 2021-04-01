const { getNewContent } = require('../utils/helper');

exports.list = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, pagingMode: mode, pagingType: type, route, env } = opts;
	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');

	let mutationType = `${pathArr.join('_').toUpperCase()}`;
	let pagingType = mutationType;

	if (pathArr.includes('list') === false) {
		pagingType = mutationType + '_LIST';
	}

	let m = env === 'mobile' ? 'm' : '';

	try {
		let contents = '';
		switch (type) {
			case 'tabs':
				contents += `<template>\n`;
				contents += `	<vc${m}-tabs \n`;
				contents += `		:value="type" \n`;
				contents += `		:animated="false"\n`;
				contents += `		@click="handleChange"\n`;
				contents += `	>\n`;
				contents += `		<vc${m}-tabs-pane \n`;
				contents += `			v-for="(item) in tabs"\n`;
				contents += `			:key="item.value"\n`;
				contents += `			:label="item.label" \n`;
				contents += `			:name="item.value"\n`;
				contents += `		>\n`;
				contents += `			<vc${m}-pull-scroll\n`;
				contents += `				:show="item.value == type" \n`;
				contents += `				:type="item.value"\n`;
				contents += `				:data-source="listInfo[item.value].data"\n`;
				contents += `				:total="listInfo[item.value].total"\n`;
				contents += `				:count="listInfo[item.value].count"\n`;
				contents += `				:reset="listInfo[item.value].reset"\n`;
				contents += `				:current.sync="current[item.value]"\n`;
				contents += `				:history="true"\n`;
				contents += `				:load-data="loadData"\n`;
				contents += `			>\n`;

				contents += `				<template #default="it">\n`;
				contents += `					<${project}-item :it="it" class="_item"/>\n`;
				contents += `				</template>\n`;
				contents += `			</vc${m}-pull-scroll>\n`;
				contents += `		</vc${m}-tabs-pane>\n`;
				contents += `	</vc${m}-tabs>\n`;
				contents += `</template>\n`;
				break;	
			default:
				contents += `<template>\n`;
				contents += `	<vc${m}-pull-scroll\n`;
				contents += `		ref="tableTarget"\n`;
				contents += `		:data-source="listInfo.data" \n`;
				contents += `		:total="listInfo.total"\n`;
				contents += `		:reset="listInfo.reset"\n`;
				contents += `		:history="true"\n`;
				contents += `		:load-data="loadData"\n`;
				contents += `	>\n`;
				contents += `		<template #default="it">\n`;
				contents += `			<${project}-item :it="it" class="_item"/>\n`;
				contents += `		</template>\n`;
				contents += `	</vc${m}-pull-scroll>\n`;
				contents += `</template>\n`;
				break;
		}
		contents += `\n`;
		contents += `<script>\n`;
		contents += `import { URL } from '@utils/utils';\n`;
		contents += `import Item from './item';\n`;

		contents += `\n`;
		contents += `export default {\n`;
		contents += `	name: '${project}-${pathArr.join("-")}-table',\n`;
		contents += `	components: {\n`;
		contents += `		'${project}-item': Item,\n`;
		contents += `	},\n`;
		contents += `	data() {\n`;
		contents += `		const { query } = this.$route;\n\n`;
		contents += `		return {\n`;
		switch (type) {
			case 'tabs':
				contents += `			type: String(query.type || "1"), // 同tabs下的value\n`;
				contents += `			current: {},\n`;
				contents += `			tabs: [\n`;
				contents += `				{ label: '标签一', value: '1' }, \n`;
				contents += `				{ label: '标签二', value: '2' }, \n`;
				contents += `				{ label: '标签三', value: '3' }\n`;
				contents += `			],\n`;
				break;
			default:
				
		}
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	computed: {\n`;
		contents += `		listInfo() {\n`;
		contents += `			return this.$store.state.${mutation}${extra}.listInfo;\n`;
		contents += `		}\n`;
		contents += `	},\n`;
		contents += `	methods: {\n`;
		contents += `		loadData(page, refresh) {\n`;
		contents += `			let { query = {} } = URL.parse();\n`;
		contents += `			return this.request({\n`;
		contents += `				url: '${pagingType}_GET',\n`;
		contents += `				type: 'GET',\n`;
		contents += `				param: {\n`;
		contents += `					...query,\n`;
		switch (type) {
			case 'tabs':
				contents += `					type: this.type,\n`;
				break;
			default:
				
		}
		contents += `					page,\n`;
		contents += `				},\n`;
		contents += `				refresh\n`;
		contents += `			}).then((res) => {\n`;
		contents += `				console.log(res, 'res');\n`;
		contents += `			}).catch((error) => {\n`;
		contents += `				console.log(error, 'error');\n`;
		contents += `			});\n`;
		contents += `		},\n`;
		switch (type) {
			case 'tabs':
				contents += `		handleChange(type) {\n`;
				contents += `			this.type = type;\n`;
				contents += `\n`;
				contents += `			let { query = {} } = URL.parse(); // this.$route需要设置scroll.sync\n`;
				contents += `			query = {\n`;
				contents += `				...query,\n`;
				contents += `				type,\n`;
				contents += `			};\n`;
				contents += `			this.$router.replace(URL.merge({ path: '${route}', query }));\n`;
				contents += `		},\n`;
				break;
			default:
				
		}
		contents += `	}\n`;
		contents += `};\n`;
		contents += `\n`;
		contents += `</script>\n`;
		contents += `\n`;
		contents += `<style lang="scss">\n`;
		contents += `\n`;
		contents += `</style>\n`;
		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};

