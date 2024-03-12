import { createSSRApp } from "vue";
import { bootstrap } from "/@/cool/bootstrap";
import App from "./App.vue";
import "./router";

export function createApp() {
	const app = createSSRApp(App);

	// 启动
	bootstrap(app);

	// 隐藏底部导航栏
	uni.hideTabBar();

	return {
		app,
	};
}
