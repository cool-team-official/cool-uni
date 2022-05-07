import { createSSRApp } from "vue";
import { bootstrap } from "/@/cool";
import "/@/mock";
import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);

	// 启动
	bootstrap(app);

	return {
		app,
	};
}
