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
				name: 'Basic',
				icon: '',
				show: true,
				route: '/tpl/paging/basic'
			},
			{
				name: 'Piece',
				icon: '',
				show: true,
				route: '/tpl/paging/piece'
			},
			{
				name: 'Tabs',
				icon: '',
				show: true,
				route: '/tpl/paging/tabs'
			},
			{
				name: 'Async',
				icon: '',
				show: true,
				route: '/tpl/paging/async'
			},
			{
				name: 'Native',
				icon: '',
				show: true,
				route: '/tpl/paging/native',
				children: [
					{
						name: 'Child Native',
						icon: '',
						show: true,
						route: '/tpl/paging/native/demo1',
					},
					{
						name: 'Child Native2',
						icon: '',
						show: true,
						route: '/tpl/paging/native/demo2',
					}
				]
			}
		]
	}
];