import { createSSRApp } from "vue";
import { bootstrap } from "/@/cool/bootstrap";
import App from "./App.vue";
import { i18n } from "./locale";
import "./router";

export function createApp() {
	const app = createSSRApp(App);
	app.use(i18n);

	bootstrap(app);

	return {
		app,
	};
}
