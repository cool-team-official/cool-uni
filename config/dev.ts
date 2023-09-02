import { proxy } from "./proxy";

export default {
	// 根地址
	host: proxy["/dev/"].target,

	// 请求地址
	get baseUrl() {
		// #ifdef H5
		return "/dev";
		// #endif

		// #ifndef H5
		return this.host + "";
		// #endif
	},
};
