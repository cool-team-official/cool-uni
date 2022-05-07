import { Plugin } from "vite";
import { parseJson, readFile } from "./utils";
import { createEps, getEps } from "./lib/eps";
import { join } from "path";

export const cool = (): Plugin | null => {
	// 读取页面路径
	const pages = readFile(join(__dirname, "../../pages.json"));

	return {
		name: "vite-cool",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				function done(data: any) {
					res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
					res.end(JSON.stringify(data));
				}

				// 自定义
				if (req.url.includes("__cool")) {
					const body = await parseJson(req);
					let next: any = null;

					switch (req.url) {
						// 创建描述文件
						case "/__cool_eps":
							next = createEps(body);
							break;
					}

					if (next) {
						next.then((data: any) => {
							done({
								code: 1000,
								data,
							});
						}).catch((message: string) => {
							done({
								code: 1001,
								message,
							});
						});
					}
				} else {
					next();
				}
			});
		},
		config() {
			return {
				define: {
					__UNI_PAGES__: JSON.stringify(pages),
					__EPS__: getEps(),
				},
			};
		},
	};
};
