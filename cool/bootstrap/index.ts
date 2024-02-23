import { createPinia } from "pinia";
import type { App } from "vue";
import mitt from "mitt";
import { createEps } from "./eps";
import { getVersion } from "../utils";
import { config } from "/@/config";

export function bootstrap(app: App) {
	// 通信
	app.provide("mitt", mitt());

	// 缓存
	app.use(createPinia());

	// 获取版本号
	getVersion().then((version) => {
		config.version = version;
	});

	// 创建 eps
	createEps();
}
