import dev from "./dev";
import prod from "./prod";

// 是否开发模式
export const isDev = import.meta.env.MODE === "development";

// 配置
export const config = {
	// 版本号
	version: "0.0.0",

	// 项目信息
	app: {
		name: "COOL-UNI",
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
				appid: "wxd532456e1e1ef9b9",
				debug: false,
			},
			// App
			app: {
				appid: "",
			},
		},
	},

	// 调试
	test: {
		token: "",
		mock: false,
		eps: true,
	},

	// 忽略
	ignore: {
		token: ["/app/user/login/wxMiniLogin"],
	},

	// 当前环境
	...(isDev ? dev : prod),
};

export * from "./proxy";
