import Vue from 'vue';
import App from './App';
import { CoolUI } from '@/cool';

Vue.config.productionTip = false;
Vue.mixin(CoolUI);

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
