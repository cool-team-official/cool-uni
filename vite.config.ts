import path from "path";
import { UserConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni"; // ！此依赖不能安装
import { cool } from "./build/cool";

function resolve(dir: string) {
	return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/

export default (): UserConfig => {
	// 代理
	const proxy = {
		"/dev": {
			target: "http://127.0.0.1:8001",
			changeOrigin: true,
			rewrite: (path: string) => path.replace(/^\/dev/, ""),
		},

		"/pro": {
			target: "https://show.cool-admin.com",
			changeOrigin: true,
			rewrite: (path: string) => path.replace(/^\/pro/, "/api"),
		},
	};

	return {
		plugins: [uni(), cool()],
		resolve: {
			alias: {
				"/@": resolve("./"),
				"/$": resolve("./pages/"),
			},
		},
		server: {
			port: 9900,
			proxy,
			hmr: {
				overlay: true,
			},
		},
	};
};
