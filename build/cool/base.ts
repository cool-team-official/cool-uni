import type { Plugin } from "vite";
import { createEps } from "./eps";
import { parseJson } from "./utils";

export function base(): Plugin {
	return {
		name: "vite-cool-base",
		enforce: "pre",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				function done(data: any) {
					res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
					res.end(JSON.stringify(data));
				}

				if (req.url?.includes("__cool")) {
					const body = await parseJson(req);

					switch (req.url) {
						// 创建描述文件
						case "/__cool_eps":
							await createEps(body);
							break;

						default:
							return done({
								code: 1001,
								message: "未知请求",
							});
					}

					done({
						code: 1000,
					});
				} else {
					next();
				}
			});
		},
	};
}
