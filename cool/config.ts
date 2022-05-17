// 是否开发模式
const isDev: boolean = import.meta.env.MODE === "development";

// 根地址
const host: string = "https://show.cool-admin.com";

// 请求地址
const baseUrl: string = (function () {
	if (isDev) {
		// H5模式下，可以配置代理前缀，对应 vite.config.ts 文件中 server.proxy
		// #ifdef H5
		return "/pro";
		// #endif

		// #ifndef H5
		return host + "";
		// #endif
	} else {
		// #ifdef H5
		return "/api";
		// #endif

		// #ifndef H5
		return host;
		// #endif
	}
})();

// 项目信息
const app = {
	name: "酷聊 COOL-CHAT",
	desc: "基于 Ts + Vue3 + Pinia 构建。",
	// 页面配置
	pages: {
		login: "/pages/user/login",
	},
	// 微信配置
	wx: {
		// 小程序
		mini: {
			appid: "",
		},
		// 公众号
		mp: {
			appid: "",
			debug: false,
		},
		// App
		app: {
			appid: "",
		},
	},
	// socket.io
	socketIO: {
		url: host + "/im",
		query: {},
	},
};

// 调试
const test = {
	token: "",
	mock: false,
	eps: false,
};

export { isDev, host, baseUrl, app, test };
