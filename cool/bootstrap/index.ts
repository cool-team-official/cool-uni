import { createPinia } from "pinia";
import { App } from "vue";
import mitt from "mitt";
import { createEps } from "./eps";

export function bootstrap(app: App) {
	// 通信
	app.provide("mitt", mitt());

	// 缓存
	app.use(createPinia());

	createEps();
}
