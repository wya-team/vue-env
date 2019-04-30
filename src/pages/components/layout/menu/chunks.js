export const getChunks = (auth = {}) => [
	{
		value: 'tpl',
		name: '模板',
		icon: '',
		show: true,
		route: '/tpl'
	},
	{
		value: 'setting',
		name: '设置',
		icon: '',
		show: true,
		route: '/setting',
		stair: true,
	}
];