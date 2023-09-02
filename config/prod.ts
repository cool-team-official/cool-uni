import { proxy } from "./proxy";

export default {
	// 根地址
	host: proxy["/prod/"].target,

	// 请求地址
	get baseUrl() {
		// #ifdef H5
		return "/api";
		// #endif

		// #ifndef H5
		return this.host + "/api";
		// #endif
	},
};
