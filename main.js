import { createSSRApp } from "vue";
import { bootstrap } from "/@/cool";
import App from "./App.vue";
import "./router";

export function createApp() {
	const app = createSSRApp(App);

	// 启动
	bootstrap(app);

	return {
		app,
	};
}
