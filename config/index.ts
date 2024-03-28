import dev from "./dev";
import prod from "./prod";

// 是否开发模式
export const isDev = import.meta.env.MODE === "development";

// 配置
export const config = {
	// 版本号
	version: "0.0.0",

	// 应用信息
	app: {
		// 应用名称
		name: "COOL-UNI",
		// 应用描述
		desc: "基于 Ts + Vue3 + Pinia 构建。",
		// 页面配置
		pages: {
			login: "/pages/user/login",
		},
		// 微信配置
		wx: {
			debug: false,
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
		token: [],
	},

	// 当前环境
	...(isDev ? dev : prod),
};

export * from "./proxy";
