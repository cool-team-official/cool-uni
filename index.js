import Storage from "./utils/storage";
import Emitter from "./mixins/emitter";
import { deepMerge } from "./utils";

// #ifndef MP-ALIPAY
import { color } from "./theme";
// #endif

// #ifdef MP-ALIPAY
let color = {};
// #endif

import "./common";

const install = (Vue, options = {}) => {
	// 配置数据
	let data = {
		// 首页页面路径
		homePage: "/",
	};

	// 主题颜色
	let _color = {
		primary: "#409eff",
		success: "#67c23a",
		warning: "#e6a23c",
		error: "#dd524d",
		info: "#909399",
		disabled: "#c0c4cc",
	};

	let $cl = {
		...deepMerge(data, options),
		color: Object.assign(_color, color, options.color),
		Storage,
		author: "cool",
		version: "1.4.1",
	};

	Vue.prototype.$cl = uni.$cl = $cl;
};

export { Emitter };

export default {
	install,
};
