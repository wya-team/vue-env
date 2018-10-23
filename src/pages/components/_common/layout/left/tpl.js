import Vue from 'vue';

export default [
	{
		name: '首页',
		icon: '',
		show: true,
		route: '/tpl/main'
	},
	{
		name: 'Basic',
		icon: '',
		show: true,
		route: '/tpl/basic'
	},
	{
		name: 'Request',
		icon: '',
		show: true,
		route: '/tpl/request'
	},
	{
		name: 'Form',
		icon: '',
		show: true,
		route: '/tpl/form'
	},
	{
		name: 'Paging',
		icon: '',
		show: true,
		route: '/tpl/paging',
		children: [
			{
				name: 'Table1',
				icon: '',
				show: true,
				route: '/tpl/paging/basic'
			},
			{
				name: 'Table2',
				icon: '',
				show: true,
				route: '/tpl/paging/tabs'
			},
			{
				name: 'Table3',
				icon: '',
				show: true,
				route: '/tpl/paging/async'
			}
		]
	}
];