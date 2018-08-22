import '../css/global.scss';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#pages',
	components: { App },
	data: {
		appName: 'vue-env',
	},
	template: '<App :appName="appName" />',
});
