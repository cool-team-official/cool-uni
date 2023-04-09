import { createSSRApp } from "vue";
import { bootstrap } from "/@/cool";
import App from "./App.vue";
import "./router";

export function createApp() {
	const app = createSSRApp(App);

	// 启动
	bootstrap(app);

	// 隐藏 Tabs
	uni.hideTabBar();

	return {
		app,
	};
}
