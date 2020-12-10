import Storage from "./utils/storage";
import Emitter from "./mixins/emitter";
import { deepMerge } from './utils'
import { color } from './theme'

import "./common";

const install = (Vue, options) => {
	let data = {
		// 首页页面路径
		homePage: '/',
	}

	let $cl = {
		...deepMerge(data, options),
		Storage,
		color,
		author: 'cool',
		version: '1.1.13'
	}

	Vue.prototype.$cl = uni.$cl = $cl;
};

export { Emitter };

export default {
	install,
};
