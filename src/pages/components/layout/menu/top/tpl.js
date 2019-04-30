export const getTplTopRoutes = (auth) => ({
	'/tpl/main': '首页',
	'/tpl/basic': 'Basic',
	'/tpl/request': 'Request',
	'/tpl/form': '表单',
	'/tpl/paging': [
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
			route: '/tpl/paging/native/demo1'
		}
	]
});